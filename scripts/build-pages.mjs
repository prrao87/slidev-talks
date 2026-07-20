import { spawnSync } from 'node:child_process'
import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const configPath = path.join(repositoryRoot, 'pages-decks.json')
const outputRoot = path.join(repositoryRoot, '.pages-site')
const slidevBinary = path.join(
  repositoryRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'slidev.cmd' : 'slidev',
)

function readArgument(name) {
  const index = process.argv.indexOf(name)
  return index === -1 ? undefined : process.argv[index + 1]
}

function repositoryName() {
  const explicit = readArgument('--repo')
  const githubRepository = process.env.GITHUB_REPOSITORY?.split('/').pop()
  const name = explicit || githubRepository

  if (!name)
    throw new Error('Pass --repo <repository-name> or set GITHUB_REPOSITORY.')

  if (!/^[A-Za-z0-9._-]+$/.test(name))
    throw new Error(`Invalid repository name: ${name}`)

  return name
}

function changedFilesSince(base) {
  if (!base)
    return undefined

  if (!/^[0-9a-f]{7,40}$/i.test(base))
    throw new Error(`Invalid base commit: ${base}`)

  const result = spawnSync('git', ['diff', '--name-only', `${base}...HEAD`], {
    cwd: repositoryRoot,
    encoding: 'utf8',
  })

  if (result.error)
    throw result.error
  if (result.status !== 0)
    throw new Error(`Could not determine changed files from ${base}.`)

  return result.stdout.split('\n').filter(Boolean)
}

function isSharedBuildInput(file) {
  return file === '.github/workflows/deploy-pages.yml'
    || file === '.github/workflows/validate-pages.yml'
    || file === 'pages-decks.json'
    || file === 'scripts/build-pages.mjs'
    || file === 'package.json'
    || file === 'package-lock.json'
    || file === 'addon-lancedb'
    || file.startsWith('addon-lancedb/')
}

function decksForChanges(decks, changedFiles) {
  if (!changedFiles || changedFiles.some(isSharedBuildInput))
    return decks

  return decks.filter((deck) => {
    const entry = deck.entry.replace(/^\.\//, '')
    const directory = path.posix.dirname(entry)

    return changedFiles.some(file => file === entry || file.startsWith(`${directory}/`))
  })
}

function validateDecks(decks) {
  if (!Array.isArray(decks) || decks.length === 0)
    throw new Error('pages-decks.json must contain at least one deck.')

  const slugs = new Set()

  for (const deck of decks) {
    if (!deck || typeof deck !== 'object')
      throw new Error('Every configured deck must be an object.')

    if (typeof deck.entry !== 'string' || !deck.entry.endsWith('.md'))
      throw new Error('Every configured deck needs a Markdown entry path.')

    if (typeof deck.title !== 'string' || !deck.title.trim())
      throw new Error(`Deck ${deck.entry} needs a title.`)

    if (typeof deck.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(deck.slug))
      throw new Error(`Deck ${deck.entry} has an invalid URL slug.`)

    if (slugs.has(deck.slug))
      throw new Error(`Duplicate deck slug: ${deck.slug}`)

    const entryPath = path.resolve(repositoryRoot, deck.entry)
    const relativeEntry = path.relative(repositoryRoot, entryPath)
    if (relativeEntry.startsWith('..') || path.isAbsolute(relativeEntry))
      throw new Error(`Deck entry escapes the repository: ${deck.entry}`)

    slugs.add(deck.slug)
  }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function landingPage(decks) {
  const links = decks
    .map(deck => `      <li><a href="./${deck.slug}/">${escapeHtml(deck.title)}</a></li>`)
    .join('\n')

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slidev talks</title>
    <style>
      :root { color-scheme: dark; font-family: system-ui, sans-serif; background: #0f0d0b; color: #f0e7dc; }
      body { max-width: 52rem; margin: 0 auto; padding: 5rem 1.5rem; }
      h1 { font-size: clamp(2rem, 7vw, 4rem); margin-bottom: 2rem; }
      ul { padding: 0; list-style: none; }
      li { border-top: 1px solid #4a4036; }
      li:last-child { border-bottom: 1px solid #4a4036; }
      a { display: block; padding: 1.25rem 0; color: #ff9e80; font-size: 1.25rem; text-decoration: none; }
      a:hover { color: #f0e7dc; }
    </style>
  </head>
  <body>
    <main>
      <h1>Presentation decks</h1>
      <ul>
${links}
      </ul>
    </main>
  </body>
</html>
`
}

async function main() {
  const repo = repositoryName()
  const config = JSON.parse(await readFile(configPath, 'utf8'))
  validateDecks(config.decks)
  const changedFiles = changedFilesSince(readArgument('--changed-since'))
  const decks = decksForChanges(config.decks, changedFiles)
  await access(slidevBinary)

  await rm(outputRoot, { recursive: true, force: true })
  await mkdir(outputRoot, { recursive: true })

  for (const deck of decks) {
    const entryPath = path.join(repositoryRoot, deck.entry)
    await access(entryPath)

    const publicPath = `/${repo}/${deck.slug}/`
    const output = path.join(outputRoot, deck.slug)
    const args = [
      'build',
      entryPath,
      '--base',
      // Slidev 52.16 prepends an absolute base to router.push() paths in hash mode.
      // A relative asset base keeps subdirectory hosting safe without duplicating
      // the deployment path inside the hash route.
      './',
      '--out',
      output,
      '--router-mode',
      'hash',
    ]

    if (!deck.includeNotes)
      args.push('--without-notes')

    console.log(`\nBuilding ${deck.title} at ${publicPath}`)
    const result = spawnSync(slidevBinary, args, {
      cwd: repositoryRoot,
      env: process.env,
      stdio: 'inherit',
    })

    if (result.error)
      throw result.error
    if (result.status !== 0)
      throw new Error(`Slidev build failed for ${deck.entry}.`)
  }

  await writeFile(path.join(outputRoot, 'index.html'), landingPage(decks))
  await writeFile(path.join(outputRoot, '.nojekyll'), '')
  console.log(`\nBuilt ${decks.length} deck(s) in ${outputRoot}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
