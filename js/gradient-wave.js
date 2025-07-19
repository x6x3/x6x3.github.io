class GradientWave {
  constructor() {
    this.canvas = document.createElement("canvas")
    this.canvas.classList.add("gradient-wave-canvas")
    document.querySelector(".stars-container").appendChild(this.canvas)

    this.ctx = this.canvas.getContext("2d")

    this.config = {
      waveCount: 3,
      waveColors: ["rgba(255, 255, 255, 0.03)", "rgba(255, 255, 255, 0.02)", "rgba(255, 255, 255, 0.01)"],
      amplitude: 50,
      frequency: 0.005,
      speed: 0.002,
    }

    this.waves = []

    this.init()
  }

  init() {
    this.resizeCanvas()
    this.createWaves()
    window.addEventListener("resize", this.resizeCanvas.bind(this))
    this.animate()
    console.log("Gradient wave animation initialized")
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    if (this.waves.length > 0) {
      this.createWaves()
    }
  }

  createWaves() {
    this.waves = []

    for (let i = 0; i < this.config.waveCount; i++) {
      this.waves.push({
        color: this.config.waveColors[i],
        amplitude: this.config.amplitude * (1 - i * 0.2),
        frequency: this.config.frequency * (1 + i * 0.1),
        speed: this.config.speed * (1 + i * 0.1),
        offset: Math.random() * Math.PI * 2,
      })
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.waves.forEach((wave) => {
      this.drawWave(wave)
      wave.offset += wave.speed
    })
  }

  drawWave(wave) {
    const { color, amplitude, frequency, offset } = wave
    const height = this.canvas.height
    const width = this.canvas.width

    this.ctx.beginPath()
    this.ctx.moveTo(0, height)

    for (let x = 0; x < width; x++) {
      const y = height - 100 + Math.sin(x * frequency + offset) * amplitude
      this.ctx.lineTo(x, y)
    }

    this.ctx.lineTo(width, height)
    this.ctx.lineTo(0, height)
    this.ctx.closePath()

    const gradient = this.ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, color)
    gradient.addColorStop(0.5, color.replace(")", ", 0.7)").replace("rgba", "rgba"))
    gradient.addColorStop(1, color)

    this.ctx.fillStyle = gradient
    this.ctx.fill()
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.gradientWave = new GradientWave()
})
