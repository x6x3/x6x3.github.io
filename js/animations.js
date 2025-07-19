document.addEventListener("DOMContentLoaded", () => {
  animateCircuitBackground()

  createDataFlowAnimation()

  createCircuitNodes()

  initCodeLineAnimations()

  initParallaxEffects()

  initPerformanceMonitoring()

  console.log("Animations script initialized")
})

function animateCircuitBackground() {
  const circuitBackground = document.querySelector(".circuit-background")

  if (!circuitBackground) {
    console.error("Circuit background element not found")
    return
  }

  console.log("Circuit background classes:", circuitBackground.className)

  const isAboutPage = circuitBackground.classList.contains("about-circuit")
  const isSkillsPage = circuitBackground.classList.contains("skills-circuit")
  const isSocialPage = circuitBackground.classList.contains("social-circuit")

  console.log("Page type detection:", { isAboutPage, isSkillsPage, isSocialPage })

  if (isAboutPage) {
    createAboutPageDataFlow(circuitBackground)
  } else if (isSkillsPage) {
    createSkillsPageDataFlow(circuitBackground)
  } else if (isSocialPage) {
    createSocialPageDataFlow(circuitBackground)
  }
}

function createAboutPageDataFlow(parent) {
  console.log("Creating About page data flow")
  for (let i = 0; i < 15; i++) {
    createDataFlowPoint(parent, {
      direction: "horizontal",
      speed: Math.random() * 8 + 4,
      size: Math.random() * 3 + 1,
    })
  }

  for (let i = 0; i < 15; i++) {
    createDataFlowPoint(parent, {
      direction: "vertical",
      speed: Math.random() * 8 + 4,
      size: Math.random() * 3 + 1,
    })
  }
}

function createSkillsPageDataFlow(parent) {
  console.log("Creating Skills page data flow")
  for (let i = 0; i < 25; i++) {
    createDataFlowPoint(parent, {
      direction: "diagonal",
      speed: Math.random() * 12 + 8,
      size: Math.random() * 2 + 0.5,
    })
  }

  for (let i = 0; i < 10; i++) {
    createPulsingNode(parent)
  }
}

function createSocialPageDataFlow(parent) {
  console.log("Creating Social page data flow")
  for (let i = 0; i < 20; i++) {
    createDataFlowPoint(parent, {
      direction: "diagonal-reverse",
      speed: Math.random() * 10 + 6,
      size: Math.random() * 2.5 + 1,
    })
  }

  for (let i = 0; i < 5; i++) {
    createConnectingLine(parent)
  }
}

function createDataFlowPoint(parent, options) {
  const point = document.createElement("div")
  point.className = "data-point"

  const x = Math.random() * 100
  const y = Math.random() * 100

  const size = options.size || Math.random() * 3 + 1

  const duration = options.speed || Math.random() * 8 + 4

  const delay = Math.random() * 5

  point.style.cssText = `
    position: absolute;
    left: ${x}%;
    top: ${y}%;
    width: ${size}px;
    height: ${size}px;
    background-color: rgba(245, 245, 240, 0.4);
    border-radius: 50%;
    opacity: 0;
    transform: translateY(0);
    animation: dataPointFlow${options.direction.charAt(0).toUpperCase() + options.direction.slice(1)} ${duration}s ease-in-out ${delay}s infinite;
  `

  const styleId = `dataflow-${options.direction}-${Math.random().toString(36).substr(2, 9)}`

  if (!document.getElementById(styleId)) {
    const style = document.createElement("style")
    style.id = styleId

    if (options.direction === "horizontal") {
      style.textContent = `
        @keyframes dataPointFlowHorizontal {
          0% {
            opacity: 0;
            transform: translateX(0);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateX(${Math.random() > 0.5 ? "-" : ""}${Math.random() * 100 + 50}px);
          }
        }
      `
    } else if (options.direction === "vertical") {
      style.textContent = `
        @keyframes dataPointFlowVertical {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateY(${Math.random() > 0.5 ? "-" : ""}${Math.random() * 100 + 50}px);
          }
        }
      `
    } else if (options.direction === "diagonal") {
      style.textContent = `
        @keyframes dataPointFlowDiagonal {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translate(${Math.random() > 0.5 ? "-" : ""}${Math.random() * 100 + 50}px, ${Math.random() > 0.5 ? "-" : ""}${Math.random() * 100 + 50}px);
          }
        }
      `
    } else if (options.direction === "diagonal-reverse") {
      style.textContent = `
        @keyframes dataPointFlowDiagonal-reverse {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translate(${Math.random() > 0.5 ? "-" : ""}${Math.random() * 100 + 50}px, ${Math.random() > 0.5 ? "" : "-"}${Math.random() * 100 + 50}px);
          }
        }
      `
    }

    document.head.appendChild(style)
  }

  parent.appendChild(point)
}

function createPulsingNode(parent) {
  const node = document.createElement("div")
  node.className = "pulsing-node"

  const x = Math.random() * 100
  const y = Math.random() * 100

  const size = Math.random() * 6 + 3

  node.style.cssText = `
    position: absolute;
    left: ${x}%;
    top: ${y}%;
    width: ${size}px;
    height: ${size}px;
    background-color: rgba(245, 245, 240, 0.2);
    border-radius: 50%;
    animation: nodePulse 4s ease-in-out infinite;
    animation-delay: ${Math.random() * 4}s;
  `

  const styleId = "node-pulse-keyframes"
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style")
    style.id = styleId
    style.textContent = `
      @keyframes nodePulse {
        0%, 100% {
          transform: scale(1);
          opacity: 0.2;
        }
        50% {
          transform: scale(1.5);
          opacity: 0.5;
        }
      }
    `
    document.head.appendChild(style)
  }

  parent.appendChild(node)
}

function createConnectingLine(parent) {
  const line = document.createElement("div")
  line.className = "connecting-line"

  const x = Math.random() * 100
  const y = Math.random() * 100
  const angle = Math.random() * 360
  const length = Math.random() * 100 + 50

  line.style.cssText = `
    position: absolute;
    left: ${x}%;
    top: ${y}%;
    width: ${length}px;
    height: 1px;
    background-color: rgba(245, 245, 240, 0.2);
    transform: rotate(${angle}deg);
    transform-origin: left center;
    animation: lineConnect 8s ease-in-out infinite;
    animation-delay: ${Math.random() * 4}s;
  `

  const styleId = "line-connect-keyframes"
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style")
    style.id = styleId
    style.textContent = `
      @keyframes lineConnect {
        0% {
          transform: rotate(${angle}deg) scaleX(0);
          opacity: 0;
        }
        50% {
          transform: rotate(${angle}deg) scaleX(1);
          opacity: 0.3;
        }
        100% {
          transform: rotate(${angle}deg) scaleX(0);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }

  parent.appendChild(line)
}

function createDataFlowAnimation() {
  const circuitBackground = document.querySelector(".circuit-background")
  if (!circuitBackground || !circuitBackground.classList.contains("about-circuit")) {
    console.log("Skipping canvas animation - not on about page or circuit background not found")
    return
  }

  console.log("Creating canvas data flow animation")

  const canvas = document.createElement("canvas")
  canvas.className = "circuit-canvas"
  canvas.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    pointer-events: none;
  `
  circuitBackground.appendChild(canvas)

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
    paths.push({
      points: generatePath(),
      progress: 0,
      speed: Math.random() * 0.002 + 0.001,
      color: `rgba(245, 245, 240, ${Math.random() * 0.3 + 0.1})`,
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

function createCircuitNodes() {
  const circuitBackground = document.querySelector(".circuit-background")
  if (!circuitBackground || !circuitBackground.classList.contains("skills-circuit")) {
    console.log("Skipping circuit nodes - not on skills page or circuit background not found")
    return
  }

  console.log("Creating circuit nodes")

  const nodesContainer = document.createElement("div")
  nodesContainer.className = "circuit-nodes"
  nodesContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  `
  circuitBackground.appendChild(nodesContainer)

  const nodeCount = 15
  const nodes = []

  for (let i = 0; i < nodeCount; i++) {
    const node = document.createElement("div")
    const size = Math.random() * 4 + 2
    const x = Math.random() * 100
    const y = Math.random() * 100

    node.className = "circuit-node"
    node.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      background-color: rgba(245, 245, 240, 0.3);
      border-radius: 50%;
      box-shadow: 0 0 ${size * 2}px rgba(245, 245, 240, 0.2);
      animation: nodeGlow ${Math.random() * 4 + 3}s ease-in-out infinite;
      animation-delay: ${Math.random() * 2}s;
    `

    nodesContainer.appendChild(node)
    nodes.push({
      element: node,
      x,
      y,
      connections: [],
    })
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const distance = Math.sqrt(Math.pow(nodes[i].x - nodes[j].x, 2) + Math.pow(nodes[i].y - nodes[j].y, 2))

      if (distance < 30) {
        const connection = document.createElement("div")
        connection.className = "node-connection"

        const x1 = nodes[i].x
        const y1 = nodes[i].y
        const x2 = nodes[j].x
        const y2 = nodes[j].y

        const length = distance
        const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI

        connection.style.cssText = `
          position: absolute;
          left: ${x1}%;
          top: ${y1}%;
          width: ${length}%;
          height: 1px;
          background-color: rgba(245, 245, 240, 0.15);
          transform: rotate(${angle}deg);
          transform-origin: left center;
          animation: connectionPulse ${Math.random() * 3 + 2}s ease-in-out infinite;
          animation-delay: ${Math.random() * 2}s;
        `

        nodesContainer.appendChild(connection)
        nodes[i].connections.push(connection)
        nodes[j].connections.push(connection)
      }
    }
  }

  const styleId = "node-animations-keyframes"
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style")
    style.id = styleId
    style.textContent = `
      @keyframes nodeGlow {
        0%, 100% {
          opacity: 0.3;
          box-shadow: 0 0 5px rgba(245, 245, 240, 0.2);
        }
        50% {
          opacity: 0.7;
          box-shadow: 0 0 10px rgba(245, 245, 240, 0.4);
        }
      }
      
      @keyframes connectionPulse {
        0%, 100% {
          opacity: 0.15;
        }
        50% {
          opacity: 0.4;
        }
      }
    `
    document.head.appendChild(style)
  }
}

function initCodeLineAnimations() {
  const codeBlocks = document.querySelectorAll(".code-container")

  codeBlocks.forEach((codeBlock) => {
    const codeLines = codeBlock.querySelectorAll(".reveal-code")

    const codeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const allLines = Array.from(entry.target.parentElement.querySelectorAll(".reveal-code"))

            allLines.forEach((line, index) => {
              setTimeout(() => {
                line.classList.add("visible")
              }, index * 100)
            })

            codeObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px",
      },
    )

    codeLines.forEach((line) => {
      codeObserver.observe(line)
    })
  })
}

function initParallaxEffects() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return
  }

  const parallaxElements = document.querySelectorAll(".section-title, .feature-card, .cta-button")

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5
    const mouseY = e.clientY / window.innerHeight - 0.5

    parallaxElements.forEach((element) => {
      const depth = Number.parseFloat(element.getAttribute("data-depth") || 0.05)
      const moveX = mouseX * depth * 20
      const moveY = mouseY * depth * 20

      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`
    })
  })

  parallaxElements.forEach((element, index) => {
    const depth = 0.03 + (index % 3) * 0.02
    element.setAttribute("data-depth", depth)
  })
}

function initPerformanceMonitoring() {
  if (!window.performance || !window.performance.now) {
    return
  }

  let frameCount = 0
  let lastTime = performance.now()
  let fps = 0

  function checkFPS() {
    frameCount++

    const currentTime = performance.now()
    const timeElapsed = currentTime - lastTime

    if (timeElapsed > 1000) {
      fps = Math.round((frameCount * 1000) / timeElapsed)
      frameCount = 0
      lastTime = currentTime

      if (fps < 30 && window.particleSystem) {
        window.particleSystem.adjustParticleCount(fps)
      }
    }

    requestAnimationFrame(checkFPS)
  }

  requestAnimationFrame(checkFPS)
}
