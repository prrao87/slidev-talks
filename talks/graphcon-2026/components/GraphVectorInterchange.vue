<template>
  <div
    ref="host"
    class="graph-vector-interchange"
    :class="{ 'cover-mode': isCover }"
    role="img"
    :aria-label="ariaLabel"
  >
    <canvas ref="canvas" aria-hidden="true" />
    <template v-if="!isCover">
      <span class="interchange-label vector-label">The vector space</span>
      <span class="interchange-label graph-label">The graph</span>
    </template>
    <div v-if="!isCover" class="interchange-vignette" aria-hidden="true" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  mode: {
    type: String,
    default: 'interchange',
    validator: value => ['interchange', 'cover'].includes(value),
  },
})

const isCover = props.mode === 'cover'
const ariaLabel = isCover
  ? 'An animated transparent vector manifold and a three-dimensional graph rotate through a full turn over the Seattle skyline.'
  : 'An animated transparent vector manifold and a three-dimensional graph move together. Once enclosed, two distant graph nodes move to the center and become two different vector directions before the graph reforms and separates again.'

const host = ref(null)
const canvas = ref(null)

const clamp01 = value => Math.min(1, Math.max(0, value))
const easeInOutCubic = value => {
  const t = clamp01(value)
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const graphPoints = [
  [-1.24, 0.68, 0.18],
  [-0.62, 1.18, -0.34],
  [0.24, 1.16, 0.42],
  [1.12, 0.72, -0.18],
  [1.34, -0.12, 0.28],
  [0.72, -1.04, -0.36],
  [-0.12, -1.22, 0.38],
  [-1.18, -0.66, -0.28],
  [0.02, 0.04, 1.20],
  [-0.34, 0.42, -1.10],
  [0.78, 0.12, -0.88],
  [-0.72, -0.18, 0.92],
  [0.16, -0.58, -0.92],
  [-0.54, 0.88, 0.76],
]

const graphEdges = [
  [0, 1], [0, 7], [0, 11], [0, 13],
  [1, 2], [1, 9], [1, 13],
  [2, 3], [2, 8], [2, 13],
  [3, 4], [3, 8], [3, 10],
  [4, 5], [4, 10],
  [5, 6], [5, 8], [5, 12],
  [6, 7], [6, 11], [6, 12],
  [7, 9], [7, 11],
  [8, 11], [8, 13],
  [9, 10], [9, 12],
  [10, 12], [11, 13],
]

let animationFrame = 0
let resizeObserver
let visibilityObserver
let disposeScene = () => {}

onBeforeUnmount(() => disposeScene())

onMounted(() => {
  const hostElement = host.value
  const canvasElement = canvas.value
  if (!hostElement || !canvasElement)
    return

  const scene = new THREE.Scene()
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.25
  renderer.setPixelRatio(isCover ? 3 : 2.5)

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50)
  const cameraRadius = isCover ? 11 : 9.6
  camera.position.set(0, 0.16, cameraRadius)
  camera.lookAt(0, 0, 0)

  scene.add(new THREE.HemisphereLight(0x8bdcff, 0x32150e, 1.25))
  const cyanLight = new THREE.PointLight(0x37c7ff, 18, 16, 2)
  cyanLight.position.set(-4.2, 2.5, 4.5)
  scene.add(cyanLight)
  const orangeLight = new THREE.PointLight(0xff6f48, 24, 14, 2)
  orangeLight.position.set(4.0, 1.6, 4.0)
  scene.add(orangeLight)

  const rootGroup = new THREE.Group()
  const manifoldGroup = new THREE.Group()
  const graphGroup = new THREE.Group()
  rootGroup.add(manifoldGroup, graphGroup)
  scene.add(rootGroup)

  const manifoldRadius = 2.50
  const manifoldAxisScale = { x: 1.16, y: 0.88, z: 1.04 }
  const deformationAmplitudes = [0.16, 0.085, 0.04]
  const dentDepth = 0.38
  const dentWidth = 0.22
  const dentDirection = new THREE.Vector3(0.94, 0.02, 0.34).normalize()
  const bendAmount = 0.20
  const deformManifoldVertexRaw = (vertex) => {
    const direction = vertex.clone().normalize()
    const dentDistance = (1 - THREE.MathUtils.clamp(direction.dot(dentDirection), -1, 1)) / dentWidth
    const dent = dentDepth * Math.exp(-(dentDistance * dentDistance))
    const warp = 1
      + deformationAmplitudes[0] * Math.sin(
        2.15 * direction.x + 1.1 * direction.y - 0.75 * direction.z,
      )
      + deformationAmplitudes[1] * Math.cos(
        3.2 * direction.z - 1.35 * direction.x + 0.8 * direction.y,
      )
      + deformationAmplitudes[2] * Math.sin(
        4.6 * direction.x * direction.y + 2.3 * direction.z,
      )
      - dent
    vertex.multiplyScalar(warp)
    vertex.x *= manifoldAxisScale.x
    vertex.y *= manifoldAxisScale.y
    vertex.z *= manifoldAxisScale.z
    vertex.x += bendAmount * manifoldRadius * (direction.y * direction.y - 0.34)
    vertex.z *= 1 + 0.07 * Math.sin(2.4 * direction.x - 1.7 * direction.y)
    return vertex
  }
  const manifoldCentroidOffset = new THREE.Vector3()
  const centroidSample = new THREE.Vector3()
  const centroidLatitudeSamples = 72
  const centroidLongitudeSamples = 144
  for (let latitude = 0; latitude < centroidLatitudeSamples; latitude += 1) {
    const normalizedY = 1 - 2 * (latitude + 0.5) / centroidLatitudeSamples
    const horizontalRadius = Math.sqrt(1 - normalizedY * normalizedY)
    for (let longitude = 0; longitude < centroidLongitudeSamples; longitude += 1) {
      const phi = Math.PI * 2 * (longitude + 0.5) / centroidLongitudeSamples
      centroidSample.set(
        manifoldRadius * horizontalRadius * Math.cos(phi),
        manifoldRadius * normalizedY,
        manifoldRadius * horizontalRadius * Math.sin(phi),
      )
      deformManifoldVertexRaw(centroidSample)
      manifoldCentroidOffset.add(centroidSample)
    }
  }
  manifoldCentroidOffset.divideScalar(centroidLatitudeSamples * centroidLongitudeSamples)
  const deformManifoldVertex = vertex => deformManifoldVertexRaw(vertex).sub(manifoldCentroidOffset)
  const pointOnManifold = (theta, phi, target = new THREE.Vector3()) => deformManifoldVertex(target.set(
    manifoldRadius * Math.sin(theta) * Math.cos(phi),
    manifoldRadius * Math.cos(theta),
    manifoldRadius * Math.sin(theta) * Math.sin(phi),
  ))

  const manifoldGeometry = new THREE.SphereGeometry(manifoldRadius, 80, 40)
  const manifoldPositions = manifoldGeometry.attributes.position
  const manifoldVertex = new THREE.Vector3()
  for (let index = 0; index < manifoldPositions.count; index += 1) {
    manifoldVertex.fromBufferAttribute(manifoldPositions, index)
    deformManifoldVertex(manifoldVertex)
    manifoldPositions.setXYZ(index, manifoldVertex.x, manifoldVertex.y, manifoldVertex.z)
  }
  manifoldPositions.needsUpdate = true
  manifoldGeometry.computeVertexNormals()

  const shellMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x158fbd,
    emissive: 0x063f5b,
    emissiveIntensity: 0.65,
    transparent: true,
    opacity: 0.075,
    roughness: 0.32,
    metalness: 0.08,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
  const shell = new THREE.Mesh(manifoldGeometry, shellMaterial)
  shell.renderOrder = 2
  manifoldGroup.add(shell)

  const gridPositions = []
  const latitudeBands = 17
  const longitudeBands = 36
  const thetaMin = 0.08
  const thetaMax = Math.PI - 0.08
  const gridStart = new THREE.Vector3()
  const gridEnd = new THREE.Vector3()
  const addGridSegment = (startTheta, startPhi, endTheta, endPhi) => {
    pointOnManifold(startTheta, startPhi, gridStart)
    pointOnManifold(endTheta, endPhi, gridEnd)
    gridPositions.push(gridStart.x, gridStart.y, gridStart.z, gridEnd.x, gridEnd.y, gridEnd.z)
  }

  for (let latitude = 0; latitude <= latitudeBands; latitude += 1) {
    const theta = THREE.MathUtils.lerp(thetaMin, thetaMax, latitude / latitudeBands)
    for (let longitude = 0; longitude < longitudeBands; longitude += 1) {
      const phiStart = Math.PI * 2 * longitude / longitudeBands
      const phiEnd = Math.PI * 2 * (longitude + 1) / longitudeBands
      addGridSegment(theta, phiStart, theta, phiEnd)
    }
  }
  for (let longitude = 0; longitude < longitudeBands; longitude += 1) {
    const phi = Math.PI * 2 * longitude / longitudeBands
    for (let latitude = 0; latitude < latitudeBands; latitude += 1) {
      const thetaStart = THREE.MathUtils.lerp(thetaMin, thetaMax, latitude / latitudeBands)
      const thetaEnd = THREE.MathUtils.lerp(thetaMin, thetaMax, (latitude + 1) / latitudeBands)
      addGridSegment(thetaStart, phi, thetaEnd, phi)
    }
  }

  const wireGeometry = new THREE.BufferGeometry()
  wireGeometry.setAttribute('position', new THREE.Float32BufferAttribute(gridPositions, 3))
  const wireMaterial = new THREE.LineBasicMaterial({
    color: 0x61d7ff,
    transparent: true,
    opacity: 0.36,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const wireframe = new THREE.LineSegments(wireGeometry, wireMaterial)
  wireframe.renderOrder = 3
  manifoldGroup.add(wireframe)

  const graphVectors = graphPoints.map(point => new THREE.Vector3(...point))
  const edgePositions = []
  graphEdges.forEach(([start, end]) => {
    edgePositions.push(...graphPoints[start], ...graphPoints[end])
  })
  const edgeGeometry = new THREE.BufferGeometry()
  edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3))
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0xff956f,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const edgeLines = new THREE.LineSegments(edgeGeometry, edgeMaterial)
  edgeLines.renderOrder = 5
  graphGroup.add(edgeLines)

  const nodeGeometry = new THREE.SphereGeometry(0.17, 24, 16)
  const nodeColors = [0xff6747, 0xff8a61, 0xf7a06f, 0xff7350, 0xe95c3c, 0xff9b72]
  const nodeVisuals = []
  graphVectors.forEach((position, index) => {
    const color = nodeColors[index % nodeColors.length]
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      depthWrite: false,
    })
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
    node.position.copy(position)
    node.renderOrder = 6
    graphGroup.add(node)
    nodeVisuals.push({ node, nodeMaterial, origin: position.clone() })
  })

  let randomSeed = 0x14a7c9
  const random = () => {
    randomSeed = (randomSeed * 1664525 + 1013904223) >>> 0
    return randomSeed / 0x100000000
  }
  const starPositions = []
  for (let index = 0; index < 130; index += 1) {
    starPositions.push(
      (random() - 0.5) * 15.5,
      (random() - 0.5) * 5.2,
      -1.5 - random() * 3.5,
    )
  }
  const starGeometry = new THREE.BufferGeometry()
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3))
  const starMaterial = new THREE.PointsMaterial({
    color: 0x6bc8ec,
    size: 0.022,
    transparent: true,
    opacity: 0.36,
    depthWrite: false,
  })
  const stars = new THREE.Points(starGeometry, starMaterial)
  stars.visible = !isCover
  scene.add(stars)

  const separatedManifoldX = -3.45
  const separatedGraphX = 3.45
  const containmentSample = new THREE.Vector3()
  let minimumManifoldRadius = Number.POSITIVE_INFINITY
  for (let latitude = 0; latitude <= 72; latitude += 1) {
    const theta = Math.PI * latitude / 72
    for (let longitude = 0; longitude < 144; longitude += 1) {
      const phi = Math.PI * 2 * longitude / 144
      pointOnManifold(theta, phi, containmentSample)
      minimumManifoldRadius = Math.min(minimumManifoldRadius, containmentSample.length())
    }
  }
  const maximumGraphRadius = Math.max(...graphVectors.map(point => point.length())) + 0.17
  const containedGraphScale = Math.min(1, minimumManifoldRadius * 0.92 / maximumGraphRadius)
  const selectedNodeIndices = [0, 4]
  const selectedNodeSet = new Set(selectedNodeIndices)
  const vectorDirections = [
    new THREE.Vector3(0.93, 0.30, 0.21).normalize(),
    new THREE.Vector3(-0.24, 0.90, 0.37).normalize(),
  ]
  const vectorMaxLength = minimumManifoldRadius * 0.92
  const vectorColors = [0xff895d, 0xff5f3f]
  const shaftGeometry = new THREE.CylinderGeometry(0.035, 0.035, 1, 16)
  const shaftGlowGeometry = new THREE.CylinderGeometry(0.078, 0.078, 1, 16)
  const headGeometry = new THREE.ConeGeometry(0.13, 0.30, 20)
  const headGlowGeometry = new THREE.ConeGeometry(0.20, 0.44, 20)
  const vectorUp = new THREE.Vector3(0, 1, 0)
  const arrowVisuals = vectorDirections.map((direction, index) => {
    const color = vectorColors[index]
    const worldQuaternion = new THREE.Quaternion().setFromUnitVectors(vectorUp, direction)
    const arrowGroup = new THREE.Group()
    arrowGroup.quaternion.copy(worldQuaternion)
    arrowGroup.renderOrder = 8

    const coreMaterial = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 1.35,
      roughness: 0.22,
      metalness: 0.08,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
    const glowMaterial = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const shaft = new THREE.Mesh(shaftGeometry, coreMaterial)
    const shaftGlow = new THREE.Mesh(shaftGlowGeometry, glowMaterial)
    const head = new THREE.Mesh(headGeometry, coreMaterial)
    const headGlow = new THREE.Mesh(headGlowGeometry, glowMaterial)
    shaft.renderOrder = 8
    shaftGlow.renderOrder = 7
    head.renderOrder = 9
    headGlow.renderOrder = 8
    arrowGroup.add(shaftGlow, shaft, headGlow, head)
    graphGroup.add(arrowGroup)
    return { arrowGroup, shaft, shaftGlow, head, headGlow, coreMaterial, glowMaterial, worldQuaternion }
  })
  const inverseGraphQuaternion = new THREE.Quaternion()

  hostElement.dataset.contained = String(maximumGraphRadius * containedGraphScale < minimumManifoldRadius)
  hostElement.dataset.manifoldRadius = minimumManifoldRadius.toFixed(3)
  hostElement.dataset.graphRadius = maximumGraphRadius.toFixed(3)
  hostElement.dataset.containedGraphScale = containedGraphScale.toFixed(3)
  hostElement.dataset.vectorCosine = Math.abs(vectorDirections[0].dot(vectorDirections[1])).toFixed(3)

  const setArrowLength = (visual, length, opacity) => {
    const headScale = easeInOutCubic(clamp01(length / 0.38))
    const coreHeadLength = 0.30 * headScale
    const glowHeadLength = 0.44 * headScale
    const coreShaftLength = Math.max(0, length - coreHeadLength)
    const glowShaftLength = Math.max(0, length - glowHeadLength)

    visual.shaft.scale.set(1, coreShaftLength, 1)
    visual.shaft.position.y = coreShaftLength / 2
    visual.shaftGlow.scale.set(1, glowShaftLength, 1)
    visual.shaftGlow.position.y = glowShaftLength / 2
    visual.head.scale.setScalar(headScale)
    visual.head.position.y = coreShaftLength + coreHeadLength / 2
    visual.headGlow.scale.setScalar(headScale)
    visual.headGlow.position.y = glowShaftLength + glowHeadLength / 2
    visual.coreMaterial.opacity = opacity
    visual.glowMaterial.opacity = 0.20 * opacity
    visual.arrowGroup.visible = opacity > 0.002
  }

  const resize = () => {
    const width = Math.max(1, hostElement.clientWidth)
    const height = Math.max(1, hostElement.clientHeight)
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(hostElement)
  resize()

  let isVisible = true
  let startedAt = performance.now()
  visibilityObserver = new IntersectionObserver((entries) => {
    const nowVisible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio > 0.05)
    if (nowVisible && !isVisible)
      startedAt = performance.now()
    isVisible = nowVisible
  }, { threshold: [0, 0.05, 0.5] })
  visibilityObserver.observe(hostElement)

  const loopDuration = 21
  const renderFrame = (now) => {
    animationFrame = requestAnimationFrame(renderFrame)
    if (!isVisible)
      return

    const elapsed = Math.max(0, (now - startedAt) / 1000)

    if (isCover) {
      const rotationProgress = (elapsed % 18) / 18
      const fullTurn = Math.PI * 2 * rotationProgress

      manifoldGroup.position.x = -2.45
      graphGroup.position.x = 2.55
      graphGroup.scale.setScalar(1.06)
      edgeMaterial.opacity = 0.72
      nodeVisuals.forEach((visual) => {
        visual.node.position.copy(visual.origin)
        visual.node.scale.setScalar(1)
        visual.nodeMaterial.opacity = 1
      })
      arrowVisuals.forEach(visual => setArrowLength(visual, 0, 0))

      manifoldGroup.rotation.x = 0.11
      manifoldGroup.rotation.y = fullTurn
      manifoldGroup.rotation.z = -0.05
      graphGroup.rotation.x = -0.08
      graphGroup.rotation.y = -fullTurn
      graphGroup.rotation.z = 0.04

      camera.position.set(0, 0.16, cameraRadius)
      camera.lookAt(0, 0, 0)
      stars.rotation.y = elapsed * 0.008

      hostElement.dataset.phase = 'cover-rotation'
      hostElement.dataset.rotation = rotationProgress.toFixed(3)
      hostElement.style.setProperty('--merge', '0')
      renderer.render(scene, camera)
      return
    }

    const loopTime = elapsed % loopDuration
    let merge = 0
    let cameraYaw = 0
    let graphFocus = 0
    let nodeConverge = 0
    let arrowProgress = 0
    let phase = 'separated'

    if (loopTime >= 2 && loopTime < 5) {
      merge = easeInOutCubic((loopTime - 2) / 3)
      phase = 'merging'
    }
    else if (loopTime >= 5 && loopTime < 6) {
      merge = 1
      phase = 'contained'
    }
    else if (loopTime >= 6 && loopTime < 8) {
      merge = 1
      phase = 'inspecting'
      cameraYaw = 0.31 * Math.sin(Math.PI * (loopTime - 6) / 2)
    }
    else if (loopTime >= 8 && loopTime < 9) {
      merge = 1
      graphFocus = easeInOutCubic(loopTime - 8)
      phase = 'isolating'
    }
    else if (loopTime >= 9 && loopTime < 10.2) {
      merge = 1
      graphFocus = 1
      nodeConverge = easeInOutCubic((loopTime - 9) / 1.2)
      phase = 'centering'
    }
    else if (loopTime >= 10.2 && loopTime < 11.5) {
      merge = 1
      graphFocus = 1
      nodeConverge = 1
      arrowProgress = easeInOutCubic((loopTime - 10.2) / 1.3)
      phase = 'vectorizing'
    }
    else if (loopTime >= 11.5 && loopTime < 12.5) {
      merge = 1
      graphFocus = 1
      nodeConverge = 1
      arrowProgress = 1
      phase = 'vectors'
    }
    else if (loopTime >= 12.5 && loopTime < 13.8) {
      merge = 1
      graphFocus = 1
      nodeConverge = 1
      arrowProgress = 1 - easeInOutCubic((loopTime - 12.5) / 1.3)
      phase = 'devectorizing'
    }
    else if (loopTime >= 13.8 && loopTime < 15) {
      merge = 1
      graphFocus = 1
      nodeConverge = 1 - easeInOutCubic((loopTime - 13.8) / 1.2)
      phase = 'restoring-nodes'
    }
    else if (loopTime >= 15 && loopTime < 16) {
      merge = 1
      graphFocus = 1 - easeInOutCubic(loopTime - 15)
      phase = 'restoring-graph'
    }
    else if (loopTime >= 16 && loopTime < 19) {
      merge = 1 - easeInOutCubic((loopTime - 16) / 3)
      phase = 'separating'
    }

    manifoldGroup.position.x = THREE.MathUtils.lerp(separatedManifoldX, 0, merge)
    graphGroup.position.x = THREE.MathUtils.lerp(separatedGraphX, 0, merge)
    graphGroup.scale.setScalar(THREE.MathUtils.lerp(1, containedGraphScale, merge))
    edgeMaterial.opacity = 0.55 * (1 - graphFocus)
    nodeVisuals.forEach((visual, index) => {
      const isSelected = selectedNodeSet.has(index)
      if (isSelected) {
        const selectedOrder = selectedNodeIndices.indexOf(index)
        visual.node.position.copy(visual.origin).multiplyScalar(1 - nodeConverge)
        visual.node.scale.setScalar(THREE.MathUtils.lerp(1, selectedOrder === 0 ? 0.92 : 1.24, nodeConverge))
        visual.nodeMaterial.opacity = selectedOrder === 0
          ? 1
          : THREE.MathUtils.lerp(1, 0.42, nodeConverge)
      }
      else {
        const opacity = 1 - graphFocus
        visual.node.position.copy(visual.origin)
        visual.node.scale.setScalar(1)
        visual.nodeMaterial.opacity = opacity
      }
    })
    const arrowLength = vectorMaxLength * arrowProgress
    const arrowOpacity = easeInOutCubic(clamp01(arrowProgress * 2.4))
    arrowVisuals.forEach(visual => setArrowLength(visual, arrowLength, arrowOpacity))
    const manifoldRotationPhase = Math.PI * 2 * loopTime / loopDuration
    manifoldGroup.rotation.x = 0.08 + 0.035 * Math.sin(manifoldRotationPhase)
    manifoldGroup.rotation.y = 0.06 + 0.12 * Math.sin(manifoldRotationPhase)
    manifoldGroup.rotation.z = -0.04 + 0.025 * Math.cos(manifoldRotationPhase)
    graphGroup.rotation.x = 0.04 * Math.sin(elapsed * 0.37)
    graphGroup.rotation.y = -elapsed * 0.12
    graphGroup.rotation.z = 0.025 * Math.cos(elapsed * 0.28)
    inverseGraphQuaternion.copy(graphGroup.quaternion).invert()
    arrowVisuals.forEach((visual) => {
      visual.arrowGroup.quaternion.copy(inverseGraphQuaternion).multiply(visual.worldQuaternion)
    })

    camera.position.set(
      Math.sin(cameraYaw) * cameraRadius,
      0.16 + 0.24 * Math.sin(cameraYaw),
      Math.cos(cameraYaw) * cameraRadius,
    )
    camera.lookAt(0, 0, 0)
    stars.rotation.y = elapsed * 0.008

    hostElement.dataset.phase = phase
    hostElement.dataset.merge = merge.toFixed(3)
    hostElement.dataset.cameraYaw = cameraYaw.toFixed(3)
    hostElement.dataset.graphFocus = graphFocus.toFixed(3)
    hostElement.dataset.nodeConverge = nodeConverge.toFixed(3)
    hostElement.dataset.arrowProgress = arrowProgress.toFixed(3)
    hostElement.style.setProperty('--merge', merge.toFixed(3))
    renderer.render(scene, camera)
  }

  animationFrame = requestAnimationFrame(renderFrame)

  disposeScene = () => {
    cancelAnimationFrame(animationFrame)
    resizeObserver?.disconnect()
    visibilityObserver?.disconnect()

    const geometries = new Set()
    const materials = new Set()
    scene.traverse((object) => {
      if (object.geometry)
        geometries.add(object.geometry)
      const objectMaterials = Array.isArray(object.material) ? object.material : [object.material]
      objectMaterials.filter(Boolean).forEach(material => materials.add(material))
    })
    geometries.forEach(geometry => geometry.dispose())
    materials.forEach((material) => {
      if (material.map)
        material.map.dispose()
      material.dispose()
    })
    renderer.dispose()
  }
})
</script>

<style scoped>
.graph-vector-interchange {
  --merge: 0;
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  border: 1px solid rgba(81, 171, 219, 0.3);
  border-radius: 16px;
  background:
    radial-gradient(circle at 26% 50%, rgba(34, 169, 222, 0.13), transparent 35%),
    radial-gradient(circle at 74% 50%, rgba(255, 105, 65, 0.11), transparent 34%),
    linear-gradient(180deg, rgba(6, 21, 32, 0.96), rgba(7, 10, 16, 0.98));
  box-shadow:
    inset 0 0 44px rgba(0, 0, 0, 0.38),
    0 18px 55px rgba(0, 0, 0, 0.16);
  isolation: isolate;
}

.graph-vector-interchange.cover-mode {
  height: 100%;
  border: 0;
  border-radius: inherit;
  background: transparent;
  box-shadow: none;
}

.graph-vector-interchange canvas {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
}

.interchange-label {
  position: absolute;
  z-index: 3;
  top: 17px;
  transform: translateX(-50%);
  opacity: calc(1 - var(--merge));
  font: 650 14px/1 'Geist', sans-serif;
  letter-spacing: 0.08em;
  text-shadow: 0 0 18px currentColor;
  transition: opacity 80ms linear;
  white-space: nowrap;
  pointer-events: none;
}

.vector-label {
  left: 25%;
  color: #72ddff;
}

.graph-label {
  left: 75%;
  color: #ff956f;
}

.interchange-vignette {
  position: absolute;
  z-index: 2;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(3, 9, 15, 0.38), transparent 12%, transparent 88%, rgba(3, 9, 15, 0.38)),
    linear-gradient(180deg, rgba(3, 9, 15, 0.22), transparent 15%, transparent 82%, rgba(3, 9, 15, 0.42));
}
</style>
