class UltraModernLoadingScreen {
  constructor() {
    this.loadingScreen = document.getElementById("loadingScreen")
    this.progressBar = document.querySelector(".progress-bar")
    this.loadingText = document.querySelector(".loading-text")
    this.loadingPercentage = document.querySelector(".loading-percentage")
    this.particlesContainer = document.querySelector(".loading-particles")

    this.messages = [
      "Initializing neural networks...",
      "Loading quantum algorithms...",
      "Establishing secure protocols...",
      "Calibrating user interface...",
      "Optimizing performance...",
      "Ready to launch...",
    ]

    this.currentMessage = 0
    this.currentPercentage = 0
    this.init()
  }

  init() {
    this.createParticles()
    this.updateMessage()
    this.simulateLoading()
  }

  createParticles() {
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
      particle.style.position = "absolute"
      particle.style.width = Math.random() * 3 + 1 + "px"
      particle.style.height = particle.style.width
      particle.style.background = "rgba(255, 255, 255, 0.3)"
      particle.style.borderRadius = "50%"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particle.style.animation = `particleFloat ${Math.random() * 10 + 10}s linear infinite`
      particle.style.animationDelay = Math.random() * 5 + "s"
      this.particlesContainer.appendChild(particle)
    }
  }

  updateMessage() {
    const messageInterval = setInterval(() => {
      if (this.currentMessage < this.messages.length - 1) {
        this.currentMessage++
        this.loadingText.textContent = this.messages[this.currentMessage]
      } else {
        clearInterval(messageInterval)
      }
    }, 700)
  }

  updatePercentage() {
    const percentageInterval = setInterval(() => {
      if (this.currentPercentage < 100) {
        this.currentPercentage += Math.random() * 3 + 1
        if (this.currentPercentage > 100) this.currentPercentage = 100
        this.loadingPercentage.textContent = Math.floor(this.currentPercentage) + "%"
      } else {
        clearInterval(percentageInterval)
      }
    }, 100)
  }

  simulateLoading() {
    this.updatePercentage()

    setTimeout(() => {
      this.loadingScreen.classList.add("hidden")

      setTimeout(() => {
        this.loadingScreen.remove()
      }, 1000)
    }, 4500)
  }
}

class LinuxBootLoader {
  constructor() {
    this.loadingScreen = document.getElementById("loadingScreen")
    this.bootLogs = document.getElementById("bootLogs")
    this.progressBar = document.getElementById("progressBar")
    this.progressText = document.getElementById("progressText")

    this.currentProgress = 0
    this.logIndex = 0
    this.bootMessages = [
      { time: 0.001234, level: "ok", message: "Initializing security kernel..." },
      { time: 0.002456, level: "ok", message: "Loading cryptographic modules..." },
      { time: 0.003789, level: "info", message: "Mounting /dev/security filesystem..." },
      { time: 0.005123, level: "ok", message: "Starting network security daemon..." },
      { time: 0.006456, level: "ok", message: "Loading iOS development framework..." },
      { time: 0.00789, level: "info", message: "Initializing Swift compiler..." },
      { time: 0.009234, level: "ok", message: "Loading Objective-C runtime..." },
      { time: 0.010567, level: "ok", message: "Starting code analysis engine..." },
      { time: 0.01189, level: "info", message: "Mounting project repositories..." },
      { time: 0.013234, level: "ok", message: "Loading vulnerability scanner..." },
      { time: 0.014567, level: "ok", message: "Initializing penetration testing tools..." },
      { time: 0.01589, level: "info", message: "Starting secure communication protocols..." },
      { time: 0.017234, level: "ok", message: "Loading encryption algorithms..." },
      { time: 0.018567, level: "ok", message: "Initializing biometric authentication..." },
      { time: 0.01989, level: "info", message: "Starting portfolio interface..." },
      { time: 0.021234, level: "ok", message: "Loading interactive animations..." },
      { time: 0.022567, level: "ok", message: "Initializing gradient background..." },
      { time: 0.02389, level: "info", message: "Starting particle system..." },
      { time: 0.025234, level: "ok", message: "Loading contact protocols..." },
      { time: 0.026567, level: "ok", message: "Initializing social media bridges..." },
      { time: 0.02789, level: "info", message: "Starting GitHub integration..." },
      { time: 0.029234, level: "ok", message: "Loading Hex-Tool security utility..." },
      { time: 0.030567, level: "ok", message: "Finalizing system initialization..." },
      { time: 0.03189, level: "ok", message: "Portfolio system ready!" },
    ]

    this.init()
  }

  init() {
    this.startBootSequence()
  }

  startBootSequence() {
    this.addBootLog()
    this.updateProgress()
  }

  addBootLog() {
    if (this.logIndex < this.bootMessages.length) {
      const message = this.bootMessages[this.logIndex]
      const logLine = document.createElement("div")
      logLine.className = "log-line"

      logLine.innerHTML = `
        <span class="timestamp">[${message.time.toFixed(6)}]</span>
        <span class="log-level ${message.level}">${message.level.toUpperCase()}</span>
        <span class="log-message">${message.message}</span>
      `

      this.bootLogs.appendChild(logLine)
      this.bootLogs.scrollTop = this.bootLogs.scrollHeight

      this.logIndex++

      const delay = Math.random() * 150 + 50
      setTimeout(() => this.addBootLog(), delay)
    }
  }

  updateProgress() {
    const progressInterval = setInterval(() => {
      if (this.currentProgress < 100) {
        this.currentProgress += Math.random() * 8 + 2
        if (this.currentProgress > 100) this.currentProgress = 100

        this.progressBar.style.width = `${this.currentProgress}%`
        this.progressText.textContent = `Loading... ${Math.floor(this.currentProgress)}%`

        if (this.currentProgress >= 100) {
          clearInterval(progressInterval)
          this.progressText.textContent = "System Ready - Launching..."

          setTimeout(() => {
            this.loadingScreen.classList.add("hidden")
            setTimeout(() => {
              this.loadingScreen.remove()
            }, 500)
          }, 800)
        }
      }
    }, 80)
  }
}

class InteractiveGradientBackground {
  constructor() {
    this.mouse = { x: 0, y: 0 }
    this.targetMouse = { x: 0, y: 0 }
    this.particles = []
    this.time = 0
    this.init()
  }

  init() {
    this.createBackground()
    this.createParticles()
    this.setupEventListeners()
    this.animate()
  }

  createBackground() {
    const background = document.createElement("div")
    background.className = "interactive-background"

    const mesh = document.createElement("div")
    mesh.className = "gradient-mesh"
    background.appendChild(mesh)

    const orbsContainer = document.createElement("div")
    orbsContainer.className = "gradient-orbs-container"

    for (let i = 0; i < 5; i++) {
      const orb = document.createElement("div")
      orb.className = "gradient-orb"
      orbsContainer.appendChild(orb)
    }

    background.appendChild(orbsContainer)

    const particlesContainer = document.createElement("div")
    particlesContainer.className = "interactive-particles"
    background.appendChild(particlesContainer)

    document.body.appendChild(background)

    this.background = background
    this.mesh = mesh
    this.orbs = orbsContainer.querySelectorAll(".gradient-orb")
    this.particlesContainer = particlesContainer
  }

  createParticles() {
    for (let i = 0; i < 30; i++) {
      const particle = {
        element: document.createElement("div"),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      }

      particle.element.className = "floating-particle"
      particle.element.style.left = particle.x + "px"
      particle.element.style.top = particle.y + "px"
      particle.element.style.width = particle.size + "px"
      particle.element.style.height = particle.size + "px"
      particle.element.style.opacity = particle.opacity

      this.particlesContainer.appendChild(particle.element)
      this.particles.push(particle)
    }
  }

  setupEventListeners() {
    document.addEventListener("mousemove", (e) => {
      this.targetMouse.x = e.clientX / window.innerWidth
      this.targetMouse.y = e.clientY / window.innerHeight
    })

    window.addEventListener("resize", () => {
      this.particles.forEach((particle) => {
        if (particle.x > window.innerWidth) particle.x = window.innerWidth
        if (particle.y > window.innerHeight) particle.y = window.innerHeight
      })
    })
  }

  animate() {
    this.time += 0.016

    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.02
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.02

    const meshTransform = `translate(${this.mouse.x * 20 - 10}px, ${this.mouse.y * 20 - 10}px) rotate(${this.mouse.x * 2}deg)`
    this.mesh.style.transform = meshTransform

    this.orbs.forEach((orb, index) => {
      const mouseInfluence = 0.1 + index * 0.02
      const timeOffset = index * 2
      const x = Math.sin(this.time * 0.5 + timeOffset) * 30 + this.mouse.x * mouseInfluence * 50
      const y = Math.cos(this.time * 0.3 + timeOffset) * 20 + this.mouse.y * mouseInfluence * 30
      const scale = 1 + Math.sin(this.time + timeOffset) * 0.1 + this.mouse.x * 0.1

      orb.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
      orb.style.opacity = 0.12 + this.mouse.x * 0.05 + this.mouse.y * 0.03
    })

    this.particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      const dx = this.mouse.x * window.innerWidth - particle.x
      const dy = this.mouse.y * window.innerHeight - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 200) {
        const force = ((200 - distance) / 200) * 0.01
        particle.vx += dx * force * 0.001
        particle.vy += dy * force * 0.001
      }

      if (particle.x < 0) particle.x = window.innerWidth
      if (particle.x > window.innerWidth) particle.x = 0
      if (particle.y < 0) particle.y = window.innerHeight
      if (particle.y > window.innerHeight) particle.y = 0

      particle.pulse += particle.pulseSpeed
      const pulseEffect = Math.sin(particle.pulse) * 0.3 + 0.7

      particle.element.style.left = particle.x + "px"
      particle.element.style.top = particle.y + "px"
      particle.element.style.opacity = particle.opacity * pulseEffect
      particle.element.style.transform = `scale(${pulseEffect})`
    })

    requestAnimationFrame(() => this.animate())
  }
}

class CustomCursor {
  constructor() {
    this.cursor = document.createElement("div")
    this.cursor.className = "custom-cursor"
    document.body.appendChild(this.cursor)

    this.mouse = { x: 0, y: 0 }
    this.cursorPos = { x: 0, y: 0 }

    this.init()
  }

  init() {
    if (window.matchMedia("(hover: none)").matches) {
      this.cursor.style.display = "none"
      return
    }

    document.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
    })

    document.addEventListener("mousedown", () => {
      this.cursor.classList.add("click")
    })

    document.addEventListener("mouseup", () => {
      this.cursor.classList.remove("click")
    })

    const hoverElements = document.querySelectorAll("a, button, .btn, .nav-link, .contact-link, .card")
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.cursor.classList.add("hover")
      })
      el.addEventListener("mouseleave", () => {
        this.cursor.classList.remove("hover")
      })
    })

    this.updateCursor()
  }

  updateCursor() {
    this.cursorPos.x += (this.mouse.x - this.cursorPos.x) * 0.15
    this.cursorPos.y += (this.mouse.y - this.cursorPos.y) * 0.15

    this.cursor.style.left = this.cursorPos.x + "px"
    this.cursor.style.top = this.cursorPos.y + "px"

    requestAnimationFrame(() => this.updateCursor())
  }
}

class ScrollAnimations {
  constructor() {
    this.init()
  }

  init() {
    this.createScrollIndicator()
    this.setupIntersectionObserver()
    this.setupScrollEffects()
  }

  createScrollIndicator() {
    const indicator = document.createElement("div")
    indicator.className = "scroll-indicator"
    indicator.innerHTML = `
      <div class="scroll-progress"></div>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    `
    document.body.appendChild(indicator)

    const progress = indicator.querySelector(".scroll-progress")

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = scrollTop / scrollHeight

      const circumference = 2 * Math.PI * 23
      const offset = circumference - scrollPercentage * circumference
      progress.style.strokeDasharray = circumference
      progress.style.strokeDashoffset = offset

      if (scrollTop > 200) {
        indicator.classList.add("visible")
      } else {
        indicator.classList.remove("visible")
      }
    })

    indicator.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")

            if (entry.target.id === "work") {
              this.animateSkills()
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: "-50px" },
    )

    document.querySelectorAll(".section, .card, .contact-link, .section-header, .skills-section").forEach((el) => {
      observer.observe(el)
    })
  }

  setupScrollEffects() {
    let lastScrollY = window.pageYOffset
    const nav = document.querySelector(".nav")

    window.addEventListener("scroll", () => {
      const currentScrollY = window.pageYOffset

      if (currentScrollY > 100) {
        nav.classList.add("scrolled")
      } else {
        nav.classList.remove("scrolled")
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        nav.classList.add("hidden")
      } else {
        nav.classList.remove("hidden")
      }

      lastScrollY = currentScrollY
    })
  }

  animateSkills() {
    const skills = document.querySelectorAll(".skill")

    skills.forEach((skill, index) => {
      setTimeout(() => {
        skill.classList.add("visible")

        const level = Number.parseInt(skill.dataset.level)
        const fill = skill.querySelector(".skill-fill")
        const percent = skill.querySelector(".skill-percent")

        if (fill && percent) {
          fill.style.width = `${level}%`
          this.animateCounter(percent, 0, level, 1500)
        }
      }, index * 200)
    })
  }

  animateCounter(element, start, end, duration) {
    const startTime = performance.now()

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(start + (end - start) * easeOut)

      element.textContent = `${current}%`

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      }
    }

    requestAnimationFrame(updateCounter)
  }
}

class ParallaxEffects {
  constructor() {
    this.init()
  }

  init() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    this.setupMouseParallax()
    this.setupScrollParallax()
  }

  setupMouseParallax() {
    const parallaxElements = document.querySelectorAll(".hero-text, .avatar-section")

    document.addEventListener("mousemove", (e) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2

      parallaxElements.forEach((element, index) => {
        const depth = (index + 1) * 0.02
        const moveX = mouseX * depth * 10
        const moveY = mouseY * depth * 10

        element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`
      })
    })
  }

  setupScrollParallax() {
    let ticking = false

    const updateParallax = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".avatar-section")

      parallaxElements.forEach((element) => {
        const speed = 0.1
        const yPos = -(scrolled * speed)
        element.style.transform += ` translateY(${yPos}px)`
      })

      ticking = false
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    })
  }
}

class HyperModernPortfolio {
  constructor() {
    this.bootLoader = null
    this.interactiveBackground = null
    this.customCursor = null
    this.scrollAnimations = null
    this.parallaxEffects = null
    this.init()
  }

  init() {
    this.bootLoader = new LinuxBootLoader()

    this.setupNavigation()
    this.setupCopyCode()
    this.setCurrentYear()

    setTimeout(() => {
      this.initAnimations()
    }, 3000)
  }

  initAnimations() {
    this.interactiveBackground = new InteractiveGradientBackground()
    this.customCursor = new CustomCursor()
    this.scrollAnimations = new ScrollAnimations()
    this.parallaxEffects = new ParallaxEffects()
  }

  setupNavigation() {
    const navToggle = document.getElementById("navToggle")
    const navMenu = document.getElementById("navMenu")

    navToggle?.addEventListener("click", () => {
      navToggle.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    document.addEventListener("click", (e) => {
      const target = e.target.closest("[data-target]")
      if (!target) return

      e.preventDefault()
      const sectionId = target.dataset.target
      const section = document.getElementById(sectionId)

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" })
        this.updateActiveNav(sectionId)
      }

      navToggle?.classList.remove("active")
      navMenu?.classList.remove("active")
    })

    this.setupScrollSpy()
  }

  setupScrollSpy() {
    const sections = document.querySelectorAll(".section")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            this.updateActiveNav(sectionId)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" },
    )

    sections.forEach((section) => observer.observe(section))
  }

  updateActiveNav(activeId) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      const href = link.getAttribute("href")?.substring(1)
      link.classList.toggle("active", href === activeId)
    })
  }

  setupCopyCode() {
    document.addEventListener("click", (e) => {
      const copyBtn = e.target.closest(".copy-btn")
      if (!copyBtn) return

      const codeWindow = copyBtn.closest(".code-window")
      const code = codeWindow?.querySelector(".code-content")?.textContent

      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          const originalHTML = copyBtn.innerHTML
          copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
          `

          setTimeout(() => {
            copyBtn.innerHTML = originalHTML
          }, 2000)
        })
      }
    })
  }

  setCurrentYear() {
    const yearElement = document.getElementById("currentYear")
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear()
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new HyperModernPortfolio()
})

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const navToggle = document.getElementById("navToggle")
    const navMenu = document.getElementById("navMenu")

    navToggle?.classList.remove("active")
    navMenu?.classList.remove("active")
  }

  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault()
    const sections = ["home", "about", "work", "contact"]
    const currentSection = document.querySelector(".nav-link.active")?.getAttribute("href")?.substring(1)
    const currentIndex = sections.indexOf(currentSection)

    let nextIndex
    if (e.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % sections.length
    } else {
      nextIndex = (currentIndex - 1 + sections.length) % sections.length
    }

    const nextSection = document.getElementById(sections[nextIndex])
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }
})

if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--transition", "all 0.1s ease")
  document.documentElement.style.setProperty("--transition-slow", "all 0.2s ease")
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.style.setProperty("--transition", "none")
  document.documentElement.style.setProperty("--transition-slow", "none")
}
