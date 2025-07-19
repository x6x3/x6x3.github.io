class ParticleSystem {
  constructor() {
    this.canvas = document.createElement("canvas")
    this.canvas.classList.add("particle-canvas")
    document.querySelector(".stars-container").appendChild(this.canvas)
    this.ctx = this.canvas.getContext("2d")
    this.particlesArray = []
    this.mousePosition = {
      x: null,
      y: null,
    }
    this.config = {
      particleCount: 80,
      particleColor: "rgba(255, 255, 255, 0.8)",
      lineColor: "rgba(255, 255, 255, 0.15)",
      particleRadius: 2,
      lineWidth: 0.5,
      lineLength: 150,
      particleSpeed: 0.5,
      interactiveDistance: 100,
      pulseEnabled: true,
      flowEnabled: true,
      flowDirection: 1,
      flowIntensity: 0.5,
    }
    this.init()
    this.reduceEffectsIfNeeded()
  }

  init() {
    this.resizeCanvas()
    this.createParticles()
    window.addEventListener("resize", this.resizeCanvas.bind(this))
    window.addEventListener("mousemove", this.handleMouseMove.bind(this))
    this.animate()
    console.log("Particle system initialized")
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    if (this.particlesArray.length > 0) {
      this.createParticles()
    }
  }

  createParticles() {
    this.particlesArray = []
    for (let i = 0; i < this.config.particleCount; i++) {
      const size = (Math.random() * 1.5 + 0.5) * this.config.particleRadius
      const x = Math.random() * this.canvas.width
      const y = Math.random() * this.canvas.height
      const directionX = (Math.random() * 2 - 1) * this.config.particleSpeed
      const directionY = (Math.random() * 2 - 1) * this.config.particleSpeed
      const color = this.config.particleColor
      const pulseSpeed = Math.random() * 0.05 + 0.01
      const pulseDirection = Math.random() > 0.5 ? 1 : -1
      this.particlesArray.push({
        x,
        y,
        size,
        baseSize: size,
        directionX,
        directionY,
        color,
        pulseSpeed,
        pulseDirection,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }
  }

  handleMouseMove(event) {
    this.mousePosition.x = event.clientX
    this.mousePosition.y = event.clientY
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (let i = 0; i < this.particlesArray.length; i++) {
      this.updateParticle(this.particlesArray[i])
      this.drawParticle(this.particlesArray[i])
    }
    this.connectParticles()
  }

  updateParticle(particle) {
    particle.x += particle.directionX
    particle.y += particle.directionY
    if (particle.x < 0 || particle.x > this.canvas.width) {
      particle.directionX = -particle.directionX
    }
    if (particle.y < 0 || particle.y > this.canvas.height) {
      particle.directionY = -particle.directionY
    }
    if (this.mousePosition.x && this.mousePosition.y) {
      const dx = this.mousePosition.x - particle.x
      const dy = this.mousePosition.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < this.config.interactiveDistance) {
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const force = (this.config.interactiveDistance - distance) / this.config.interactiveDistance
        particle.directionX -= forceDirectionX * force * 0.6
        particle.directionY -= forceDirectionY * force * 0.6
      }
    }
    if (this.config.pulseEnabled) {
      particle.size =
        particle.baseSize +
        Math.sin(Date.now() * particle.pulseSpeed) * particle.baseSize * 0.3 * particle.pulseDirection
    }
    if (this.config.flowEnabled) {
      particle.x += Math.sin(Date.now() * 0.001) * this.config.flowIntensity * this.config.flowDirection * 0.1
    }
  }

  drawParticle(particle) {
    this.ctx.beginPath()
    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    this.ctx.fillStyle = particle.color
    this.ctx.fill()
    this.ctx.shadowBlur = particle.size * 2
    this.ctx.shadowColor = particle.color
  }

  connectParticles() {
    for (let a = 0; a < this.particlesArray.length; a++) {
      for (let b = a; b < this.particlesArray.length; b++) {
        const dx = this.particlesArray[a].x - this.particlesArray[b].x
        const dy = this.particlesArray[a].y - this.particlesArray[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < this.config.lineLength) {
          const opacity = 1 - distance / this.config.lineLength
          this.ctx.beginPath()
          this.ctx.strokeStyle = this.config.lineColor.replace("0.15", opacity * 0.15)
          this.ctx.lineWidth = this.config.lineWidth
          this.ctx.moveTo(this.particlesArray[a].x, this.particlesArray[a].y)
          this.ctx.lineTo(this.particlesArray[b].x, this.particlesArray[b].y)
          this.ctx.stroke()
        }
      }
    }
  }

  reduceEffectsIfNeeded() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isMobile || prefersReducedMotion) {
      this.config.particleCount = Math.floor(this.config.particleCount * 0.5)
      this.config.lineLength = Math.floor(this.config.lineLength * 0.7)
      this.config.pulseEnabled = false
      this.createParticles()
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.particleSystem = new ParticleSystem()
})
