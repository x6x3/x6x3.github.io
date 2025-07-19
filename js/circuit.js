
class CircuitAnimation {
  constructor() {
    this.canvas = document.createElement("canvas")
    this.canvas.classList.add("circuit-canvas")
    document.querySelector(".stars-container").appendChild(this.canvas)

    this.ctx = this.canvas.getContext("2d")
    this.circuits = []
    this.nodes = []

    this.config = {
      nodeCount: 15,
      circuitCount: 8,
      nodeColor: "rgba(255, 255, 255, 0.7)",
      lineColor: "rgba(255, 255, 255, 0.2)",
      pulseColor: "rgba(255, 255, 255, 0.8)",
      nodeSize: 3,
      lineWidth: 1,
      pulseSpeed: 0.05,
      animationSpeed: 0.002,
    }

    this.init()
  }

  init() {
    this.resizeCanvas()
    this.createNodes()
    this.createCircuits()
    window.addEventListener("resize", this.resizeCanvas.bind(this))
    this.animate()
    console.log("Circuit animation initialized")
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    if (this.nodes.length > 0) {
      this.createNodes()
      this.createCircuits()
    }
  }

  createNodes() {
    this.nodes = []

    for (let i = 0; i < this.config.nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: this.config.nodeSize + Math.random() * 2,
        pulseSpeed: Math.random() * 0.05 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      })
    }
  }

  createCircuits() {
    this.circuits = []

    for (let i = 0; i < this.config.circuitCount; i++) {
      const startNodeIndex = Math.floor(Math.random() * this.nodes.length)
      let endNodeIndex

      do {
        endNodeIndex = Math.floor(Math.random() * this.nodes.length)
      } while (endNodeIndex === startNodeIndex)

      const startNode = this.nodes[startNodeIndex]
      const endNode = this.nodes[endNodeIndex]

      const points = [{ x: startNode.x, y: startNode.y }]

      const pointCount = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < pointCount; j++) {
        const midX = startNode.x + ((endNode.x - startNode.x) * (j + 1)) / (pointCount + 1)
        const midY = startNode.y + ((endNode.y - startNode.y) * (j + 1)) / (pointCount + 1)

        const randomOffsetX = (Math.random() - 0.5) * 100
        const randomOffsetY = (Math.random() - 0.5) * 100

        points.push({
          x: midX + randomOffsetX,
          y: midY + randomOffsetY,
        })
      }

      points.push({ x: endNode.x, y: endNode.y })

      this.circuits.push({
        points,
        progress: 0,
        speed: Math.random() * 0.001 + 0.0005,
        pulsePosition: 0,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        active: Math.random() > 0.3,
      })
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.circuits.forEach((circuit) => {
      if (circuit.active) {
        this.updateCircuit(circuit)
        this.drawCircuit(circuit)
      } else if (Math.random() < 0.005) {
        circuit.active = true
        circuit.progress = 0
      }
    })

    this.nodes.forEach((node) => {
      this.drawNode(node)
    })
  }

  updateCircuit(circuit) {
    circuit.progress += circuit.speed
    if (circuit.progress >= 1) {
      circuit.progress = 0
      circuit.active = Math.random() > 0.3
    }

    circuit.pulsePosition = (circuit.pulsePosition + circuit.pulseSpeed) % 1
  }

  drawCircuit(circuit) {
    const { points, progress, pulsePosition } = circuit

    let totalLength = 0
    const segmentLengths = []

    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x
      const dy = points[i].y - points[i - 1].y
      const length = Math.sqrt(dx * dx + dy * dy)

      segmentLengths.push(length)
      totalLength += length
    }

    this.ctx.beginPath()
    this.ctx.moveTo(points[0].x, points[0].y)

    let drawnLength = 0
    const targetLength = totalLength * progress

    for (let i = 1; i < points.length; i++) {
      if (drawnLength + segmentLengths[i - 1] <= targetLength) {
        this.ctx.lineTo(points[i].x, points[i].y)
        drawnLength += segmentLengths[i - 1]
      } else {
        const remainingLength = targetLength - drawnLength
        const ratio = remainingLength / segmentLengths[i - 1]

        const x = points[i - 1].x + (points[i].x - points[i - 1].x) * ratio
        const y = points[i - 1].y + (points[i].y - points[i - 1].y) * ratio

        this.ctx.lineTo(x, y)
        break
      }
    }

    this.ctx.strokeStyle = this.config.lineColor
    this.ctx.lineWidth = this.config.lineWidth
    this.ctx.stroke()

    if (progress > 0.1) {
      let pulseLength = 0
      const pulseTarget = totalLength * pulsePosition * progress

      this.ctx.beginPath()
      this.ctx.moveTo(points[0].x, points[0].y)

      let pulsePoint = { x: points[0].x, y: points[0].y }

      for (let i = 1; i < points.length; i++) {
        if (pulseLength + segmentLengths[i - 1] <= pulseTarget) {
          this.ctx.lineTo(points[i].x, points[i].y)
          pulseLength += segmentLengths[i - 1]
          pulsePoint = { x: points[i].x, y: points[i].y }
        } else {
          const remainingLength = pulseTarget - pulseLength
          const ratio = remainingLength / segmentLengths[i - 1]

          pulsePoint = {
            x: points[i - 1].x + (points[i].x - points[i - 1].x) * ratio,
            y: points[i - 1].y + (points[i].y - points[i - 1].y) * ratio,
          }

          break
        }
      }

      this.ctx.beginPath()
      this.ctx.arc(pulsePoint.x, pulsePoint.y, 3, 0, Math.PI * 2)
      this.ctx.fillStyle = this.config.pulseColor
      this.ctx.shadowBlur = 10
      this.ctx.shadowColor = this.config.pulseColor
      this.ctx.fill()
      this.ctx.shadowBlur = 0
    }
  }

  drawNode(node) {
    const pulse = Math.sin(Date.now() * node.pulseSpeed + node.pulseOffset) * 0.5 + 0.5
    const size = node.size * (1 + pulse * 0.3)
    const opacity = 0.5 + pulse * 0.5

    this.ctx.beginPath()
    this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
    this.ctx.fillStyle = this.config.nodeColor.replace("0.7", opacity)

    this.ctx.shadowBlur = size * 2
    this.ctx.shadowColor = this.config.nodeColor

    this.ctx.fill()
    this.ctx.shadowBlur = 0
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.circuitAnimation = new CircuitAnimation()
})

document.addEventListener("DOMContentLoaded", () => {
  // Initialize circuit background
  //initCircuitBackground()
  // Log initialization for debugging
  //console.log("Circuit animations initialized")
})

function initCircuitBackground() {
  const circuitBackground = document.querySelector(".circuit-background")

  if (!circuitBackground) {
    console.error("Circuit background element not found")
    return
  }

  const isAboutPage = circuitBackground.classList.contains("about-circuit")
  const isSkillsPage = circuitBackground.classList.contains("skills-circuit")
  const isSocialPage = circuitBackground.classList.contains("social-circuit")

  console.log("Page type detection:", { isAboutPage, isSkillsPage, isSocialPage })

  if (isAboutPage) {
    createAboutPageCircuit(circuitBackground)
  } else if (isSkillsPage) {
    createSkillsPageCircuit(circuitBackground)
  } else if (isSocialPage) {
    createSocialPageCircuit(circuitBackground)
  }

  createCanvasAnimation(circuitBackground)
}

function createAboutPageCircuit(parent) {
  console.log("Creating About page circuit elements")
  createDataPoints(parent, 15, "horizontal")
  createDataPoints(parent, 15, "vertical")
  createConnectionNodes(parent, 8)
}

function createSkillsPageCircuit(parent) {
  console.log("Creating Skills page circuit elements")
  createDataPoints(parent, 25, "diagonal")
  createSkillNodes(parent, 12)
}

function createSocialPageCircuit(parent) {
  console.log("Creating Social page circuit elements")
  createDataPoints(parent, 20, "diagonal-reverse")
  createConnectingLines(parent, 10)
}

function createDataPoints(parent, count, direction) {
  for (let i = 0; i < count; i++) {
    const point = document.createElement("div")
    point.className = "circuit-element circuit-dot"

    const x = Math.random() * 100
    const y = Math.random() * 100
    const size = Math.random() * 3 + 1
    const duration = Math.random() * 8 + 4
    const delay = i * 0.1 + Math.random() * 2

    point.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      opacity: 0;
      transform: translate3d(0, 0, 0);
      animation: dataFlow${direction.charAt(0).toUpperCase() + direction.slice(1)} ${duration}s cubic-bezier(0.65, 0.05, 0.36, 0.95) ${delay}s infinite;
    `

    parent.appendChild(point)
    createDataFlowKeyframes(direction)
  }
}

function createDataFlowKeyframes(direction) {
  const styleId = `dataflow-${direction}-keyframes`

  if (!document.getElementById(styleId)) {
    const style = document.createElement("style")
    style.id = styleId

    let keyframes = ""

    if (direction === "horizontal") {
      keyframes = `
        @keyframes dataFlowHorizontal {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translate3d(${Math.random() > 0.5 ? "-" : ""}${Math.random() * 100 + 50}px, 0, 0);
          }
        }
      `
    } else if (direction === "vertical") {
      keyframes = `
        @keyframes dataFlowVertical {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translate3d(0, ${Math.random() > 0.5 ? "-" : ""}${Math.random() * 100 + 50}px, 0);
          }
        }
      `
    } else if (direction === "diagonal") {
      keyframes = `
        @keyframes dataFlowDiagonal {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translate3d(${Math.random() > 0.5 ? "-" : ""}${Math.random() * 100 + 50}px, ${Math.random() > 0.5 ? "-" : ""}${Math.random() * 100 + 50}px, 0);
          }
        }
      `
    } else if (direction === "diagonal-reverse") {
      keyframes = `
        @keyframes dataFlowDiagonalReverse {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translate3d(${Math.random() > 0.5 ? "-" : ""}${Math.random() * 100 + 50}px, ${Math.random() > 0.5 ? "" : "-"}${Math.random() * 100 + 50}px, 0);
          }
        }
      `
    }

    style.textContent = keyframes
    document.head.appendChild(style)
  }
}

function createConnectionNodes(parent, count) {
  const nodes = []

  for (let i = 0; i < count; i++) {
    const node = document.createElement("div")
    node.className = "circuit-element circuit-node"

    const x = Math.random() * 100
    const y = Math.random() * 100
    const size = Math.random() * 4 + 2

    node.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      opacity: 0.3;
      animation: nodePulse ${Math.random() * 4 + 3}s cubic-bezier(0.65, 0.05, 0.36, 0.95) ${Math.random() * 2}s infinite;
    `

    parent.appendChild(node)
    nodes.push({ element: node, x, y })
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const distance = Math.sqrt(Math.pow(nodes[i].x - nodes[j].x, 2) + Math.pow(nodes[i].y - nodes[j].y, 2))
      if (distance < 30) {
        createConnection(parent, nodes[i], nodes[j])
      }
    }
  }

  const styleId = "node-pulse-keyframes"
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style")
    style.id = styleId
    style.textContent = `
      @keyframes nodePulse {
        0%, 100% {
          opacity: 0.3;
          box-shadow: 0 0 5px rgba(245, 245, 240, 0.2);
        }
        50% {
          opacity: 0.7;
          box-shadow: 0 0 10px rgba(245, 245, 240, 0.4);
        }
      }
    `
    document.head.appendChild(style)
  }
}

function createConnection(parent, node1, node2) {
  const connection = document.createElement("div")
  connection.className = "circuit-element circuit-line"

  const x1 = node1.x
  const y1 = node1.y
  const x2 = node2.x
  const y2 = node2.y

  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI

  connection.style.cssText = `
    left: ${x1}%;
    top: ${y1}%;
    width: ${length}%;
    height: 1px;
    opacity: 0.1935; /* Increased from 0.15 by 29% */
    transform: rotate(${angle}deg);
    transform-origin: left center;
    animation: connectionPulse ${Math.random() * 3 + 2}s cubic-bezier(0.65, 0.05, 0.36, 0.95) ${Math.random() * 2}s infinite;
  `

  parent.appendChild(connection)

  const styleId = "connection-pulse-keyframes"
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style")
    style.id = styleId
    style.textContent = `
      @keyframes connectionPulse {
        0%, 100% {
          opacity: 0.1935; /* Increased from 0.15 by 29% */
        }
        50% {
          opacity: 0.516; /* Increased from 0.4 by 29% */
        }
      }
    `
    document.head.appendChild(style)
  }
}

function createSkillNodes(parent, count) {
  const nodes = []

  for (let i = 0; i < count; i++) {
    const node = document.createElement("div")
    node.className = "circuit-element circuit-node"

    const x = Math.random() * 100
    const y = Math.random() * 100
    const size = (i / count) * 6 + 2

    node.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      opacity: 0.516; /* Increased from 0.4 by 29% */
      animation: skillNodePulse ${Math.random() * 4 + 3}s cubic-bezier(0.65, 0.05, 0.36, 0.95) ${i * 0.2}s infinite;
    `

    parent.appendChild(node)
    nodes.push({ element: node, x, y, size })
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = 1; j <= Math.min(3, nodes.length - i - 1); j++) {
      createConnection(parent, nodes[i], nodes[i + j])
    }
  }

  const styleId = "skill-node-pulse-keyframes"
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style")
    style.id = styleId
    style.textContent = `
      @keyframes skillNodePulse {
        0%, 100% {
          opacity: 0.516; /* Increased from 0.4 by 29% */
          box-shadow: 0 0 5px rgba(245, 245, 240, 0.387); /* Increased from 0.3 by 29% */
        }
        50% {
          opacity: 1.0; /* Capped at 1.0, would be 0.8 * 1.29 = 1.032 */
          box-shadow: 0 0 15px rgba(245, 245, 240, 0.645); /* Increased from 0.5 by 29% */
        }
      }
    `
    document.head.appendChild(style)
  }
}

function createConnectingLines(parent, count) {
  for (let i = 0; i < count; i++) {
    const line = document.createElement("div")
    line.className = "circuit-element circuit-line"

    const x = Math.random() * 100
    const y = Math.random() * 100
    const angle = Math.random() * 360
    const length = Math.random() * 100 + 50

    line.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${length}px;
      height: 1px;
      opacity: 0;
      transform: rotate(${angle}deg) scaleX(0);
      transform-origin: left center;
      animation: lineConnect 8s cubic-bezier(0.65, 0.05, 0.36, 0.95) ${i * 0.3}s infinite;
    `

    parent.appendChild(line)
  }

  const styleId = "line-connect-keyframes"
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style")
    style.id = styleId
    style.textContent = `
      @keyframes lineConnect {
        0% {
          opacity: 0;
          transform: rotate(var(--angle)) scaleX(0);
        }
        50% {
          opacity: 0.3;
          transform: rotate(var(--angle)) scaleX(1);
        }
        100% {
          opacity: 0;
          transform: rotate(var(--angle)) scaleX(0);
        }
      }
    `
    document.head.appendChild(style)
  }
}

function createCanvasAnimation(parent) {
  const isAboutPage = parent.classList.contains("about-circuit")
  if (!isAboutPage) return

  console.log("Creating canvas animation")

  const canvas = document.createElement("canvas")
  canvas.className = "circuit-canvas"
  parent.appendChild(canvas)

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  const ctx = canvas.getContext("2d")
  if (!ctx) {
    console.error("Could not get canvas context")
    return
  }

  const paths = []
  for (let i = 0; i < 10; i++) {
    const minOpacity = 0.1 * 1.29
    const maxOpacity = 0.3 * 1.29
    const opacity = Math.random() * maxOpacity + minOpacity

    paths.push({
      points: generatePath(),
      progress: 0,
      speed: Math.random() * 0.002 + 0.001,
      color: `rgba(245, 245, 240, ${opacity})`,
      width: Math.random() * 2 + 1,
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    paths.forEach((path) => {
      path.progress += path.speed
      if (path.progress >= 1) {
        path.progress = 0
        path.points = generatePath()
        path.speed = Math.random() * 0.002 + 0.001
      }

      drawPath(ctx, path)
    })

    requestAnimationFrame(animate)
  }

  animate()
}

function generatePath() {
  const points = []
  const numPoints = Math.floor(Math.random() * 5) + 3

  const startX = Math.random() * window.innerWidth
  const startY = Math.random() * window.innerHeight
  points.push({ x: startX, y: startY })

  let currentX = startX
  let currentY = startY

  for (let i = 0; i < numPoints; i++) {
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * 200 + 50

    currentX += Math.cos(angle) * distance
    currentY += Math.sin(angle) * distance

    points.push({ x: currentX, y: currentY })
  }

  return points
}

function drawPath(ctx, path) {
  const { points, progress, color, width } = path

  if (points.length < 2) return

  const totalSegments = points.length - 1
  const segmentsToShow = Math.ceil(totalSegments * progress)

  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)

  for (let i = 1; i <= segmentsToShow && i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }

  if (segmentsToShow < totalSegments) {
    const partialProgress = (progress * totalSegments) % 1
    const startPoint = points[segmentsToShow]
    const endPoint = points[segmentsToShow + 1]

    if (startPoint && endPoint) {
      const partialX = startPoint.x + (endPoint.x - startPoint.x) * partialProgress
      const partialY = startPoint.y + (endPoint.y - startPoint.y) * partialProgress

      ctx.lineTo(partialX, partialY)
    }
  }

  ctx.stroke()

  for (let i = 0; i <= segmentsToShow && i < points.length; i++) {
    ctx.beginPath()
    ctx.arc(points[i].x, points[i].y, width * 1.5, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  }
}

function supportsHardwareAcceleration() {
  const testEl = document.createElement("div")
  testEl.style.cssText = "transform: translate3d(0, 0, 0);"
  return testEl.style.length > 0
}

function optimizeForDevice() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const supportsHardware = supportsHardwareAcceleration()

  if (isMobile || !supportsHardware) {
    document.documentElement.style.setProperty("--circuit-opacity", "0.0645")

    const circuitElements = document.querySelectorAll(".circuit-element")
    if (circuitElements.length > 20) {
      for (let i = 20; i < circuitElements.length; i++) {
        circuitElements[i].remove()
      }
    }
  }

  if (hasReducedMotion) {
    const circuitElements = document.querySelectorAll(
      ".circuit-element, .circuit-background, .circuit-background::before, .circuit-background::after",
    )
    circuitElements.forEach((el) => {
      if (el.style) {
        el.style.animationPlayState = "paused"
      }
    })
  }
}

window.addEventListener("load", optimizeForDevice)
