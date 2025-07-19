class UltraRefinedPortfolio {
  constructor() {
    this.bootLoader = null
    this.backgroundSystem = null
    this.cursorSystem = null
    this.animationSystem = null
    this.navigationSystem = null
    this.scrollSystem = null
    this.performanceMonitor = null

    this.isInitialized = false
    this.debugMode = false

    this.init()
  }

  init() {
    this.log("Initializing Ultra-Refined Portfolio...")

    this.bootLoader = new UltraRefinedBootLoader()

    this.setupEventListeners()
    this.setupPerformanceMonitoring()

    setTimeout(() => {
      this.initializeMainSystems()
    }, 3200)
  }

  initializeMainSystems() {
    this.log("Initializing main systems...")

    try {
      this.backgroundSystem = new UltraRefinedBackground()
      this.cursorSystem = new UltraRefinedCursor()
      this.navigationSystem = new UltraRefinedNavigation()
      this.scrollSystem = new UltraRefinedScrollSystem()
      this.animationSystem = new UltraRefinedAnimations()

      this.setupMiscFeatures()
      this.isInitialized = true

      this.log("All systems initialized successfully")
    } catch (error) {
      console.error("Error initializing systems:", error)
    }
  }

  setupEventListeners() {
    document.addEventListener("keydown", this.handleKeyboard.bind(this))
    window.addEventListener("resize", this.debounce(this.handleResize.bind(this), 250))
    document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this))
    window.addEventListener("error", this.handleError.bind(this))
  }

  handleKeyboard(e) {
    if (!this.isInitialized) return

    switch (e.key) {
      case "Escape":
        this.navigationSystem?.closeMobileMenu()
        break
      case "ArrowDown":
      case "ArrowUp":
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          this.scrollSystem?.navigateSection(e.key === "ArrowDown" ? 1 : -1)
        }
        break
      case "d":
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          this.toggleDebugMode()
        }
        break
    }
  }

  handleResize() {
    this.backgroundSystem?.handleResize()
    this.animationSystem?.handleResize()
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.backgroundSystem?.pause()
    } else {
      this.backgroundSystem?.resume()
    }
  }

  handleError(error) {
    console.error("Portfolio Error:", error)
  }

  setupPerformanceMonitoring() {
    this.performanceMonitor = new PerformanceMonitor()
  }

  setupMiscFeatures() {
    this.setupCodeCopy()
    this.setupYearUpdate()
    this.setupAccessibility()
  }

  setupCodeCopy() {
    document.addEventListener("click", async (e) => {
      const copyBtn = e.target.closest(".copy-btn")
      if (!copyBtn) return

      const codeWindow = copyBtn.closest(".code-window")
      const code = codeWindow?.querySelector(".code-content")?.textContent

      if (code) {
        try {
          await navigator.clipboard.writeText(code)
          this.showCopyFeedback(copyBtn)
        } catch (err) {
          console.error("Failed to copy code:", err)
        }
      }
    })
  }

  showCopyFeedback(button) {
    const originalHTML = button.innerHTML
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20,6 9,17 4,12"/>
      </svg>
    `

    setTimeout(() => {
      button.innerHTML = originalHTML
    }, 2500)
  }

  setupYearUpdate() {
    const yearElement = document.getElementById("currentYear")
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear()
    }
  }

  setupAccessibility() {
    if (!document.querySelector(".skip-to-content")) {
      const skipLink = document.createElement("a")
      skipLink.className = "skip-to-content"
      skipLink.href = "#main"
      skipLink.textContent = "Skip to main content"
      skipLink.setAttribute("aria-label", "Skip to main content")
      document.body.insertBefore(skipLink, document.body.firstChild)
    }

    document.querySelectorAll("button, a, input").forEach((el) => {
      if (!el.hasAttribute("aria-label") && !el.textContent.trim()) {
        const context = el.className || el.id || "Interactive element"
        el.setAttribute("aria-label", context)
      }
    })
  }

  toggleDebugMode() {
    this.debugMode = !this.debugMode
    document.body.classList.toggle("debug-mode", this.debugMode)
    this.log(`Debug mode ${this.debugMode ? "enabled" : "disabled"}`)
  }

  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  log(message) {
    if (this.debugMode) {
      console.log(`[UltraRefinedPortfolio] ${message}`)
    }
  }

  destroy() {
    this.backgroundSystem?.destroy()
    this.cursorSystem?.destroy()
    this.animationSystem?.destroy()
    this.navigationSystem?.destroy()
    this.scrollSystem?.destroy()
    this.performanceMonitor?.destroy()

    this.isInitialized = false
    this.log("Portfolio destroyed")
  }
}

class UltraRefinedBootLoader {
  constructor() {
    this.loadingScreen = document.getElementById("loadingScreen")
    this.bootLogs = document.getElementById("bootLogs")
    this.progressBar = document.getElementById("progressBar")
    this.progressText = document.getElementById("progressText")

    this.currentProgress = 0
    this.logIndex = 0
    this.isComplete = false

    this.bootMessages = [
      { time: 0.001234, level: "ok", message: "Initializing ultra-refined kernel..." },
      { time: 0.003456, level: "ok", message: "Loading advanced cryptographic modules..." },
      { time: 0.005789, level: "info", message: "Mounting /dev/security filesystem..." },
      { time: 0.007123, level: "ok", message: "Starting enhanced network security daemon..." },
      { time: 0.009456, level: "ok", message: "Loading next-generation iOS framework..." },
      { time: 0.011789, level: "info", message: "Initializing Swift compiler v5.9..." },
      { time: 0.014123, level: "ok", message: "Loading optimized Objective-C runtime..." },
      { time: 0.016456, level: "ok", message: "Starting intelligent code analysis engine..." },
      { time: 0.018789, level: "info", message: "Mounting distributed project repositories..." },
      { time: 0.021123, level: "ok", message: "Loading AI-powered vulnerability scanner..." },
      { time: 0.023456, level: "ok", message: "Initializing advanced penetration testing suite..." },
      { time: 0.025789, level: "info", message: "Starting quantum-encrypted communication..." },
      { time: 0.028123, level: "ok", message: "Loading military-grade encryption algorithms..." },
      { time: 0.030456, level: "ok", message: "Initializing biometric authentication matrix..." },
      { time: 0.032789, level: "info", message: "Starting ultra-modern portfolio interface..." },
      { time: 0.035123, level: "ok", message: "Loading hardware-accelerated animations..." },
      { time: 0.037456, level: "ok", message: "Initializing interactive gradient system..." },
      { time: 0.039789, level: "info", message: "Starting advanced particle physics engine..." },
      { time: 0.042123, level: "ok", message: "Loading social media integration protocols..." },
      { time: 0.044456, level: "ok", message: "Initializing secure communication channels..." },
      { time: 0.046789, level: "info", message: "Starting GitHub enterprise integration..." },
      { time: 0.049123, level: "ok", message: "Loading Hex-Tool security framework..." },
      { time: 0.051456, level: "ok", message: "Finalizing ultra-refined system architecture..." },
      { time: 0.053789, level: "ok", message: "Portfolio system ultra-ready! 🚀" },
    ]

    this.init()
  }

  init() {
    this.startBootSequence()
  }

  startBootSequence() {
    this.addBootLogs()
    this.updateProgress()
  }

  addBootLogs() {
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

      const delay = Math.random() * 120 + 40
      setTimeout(() => this.addBootLogs(), delay)
    }
  }

  updateProgress() {
    const progressInterval = setInterval(() => {
      if (this.currentProgress < 100) {
        this.currentProgress += Math.random() * 6 + 3
        if (this.currentProgress > 100) this.currentProgress = 100

        this.progressBar.style.width = `${this.currentProgress}%`
        this.progressText.textContent = `Loading... ${Math.floor(this.currentProgress)}%`

        if (this.currentProgress >= 100) {
          clearInterval(progressInterval)
          this.progressText.textContent = "System Ultra-Ready - Launching..."

          setTimeout(() => {
            this.loadingScreen.classList.add("hidden")
            setTimeout(() => {
              this.loadingScreen.remove()
              this.isComplete = true
            }, 600)
          }, 800)
        }
      }
    }, 75)
  }
}

class UltraRefinedBackground {
  constructor() {
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    this.particles = []
    this.time = 0
    this.isActive = true
    this.animationFrame = null

    this.init()
  }

  init() {
    this.createBackground()
    this.createParticles()
    this.setupEventListeners()
    this.startAnimation()
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
      orb.style.setProperty("--index", i)
      orbsContainer.appendChild(orb)
    }

    background.appendChild(orbsContainer)

    const particlesContainer = document.createElement("div")
    particlesContainer.className = "interactive-particles"
    background.appendChild(particlesContainer)

    document.body.appendChild(background)

    this.background = background
    this.mesh = mesh
    this.orbs = Array.from(orbsContainer.querySelectorAll(".gradient-orb"))
    this.particlesContainer = particlesContainer
  }

  createParticles() {
    const particleCount = this.getOptimalParticleCount()

    for (let i = 0; i < particleCount; i++) {
      const particle = {
        element: document.createElement("div"),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        originalSize: 0,
      }

      particle.originalSize = particle.size
      particle.element.className = "floating-particle"
      particle.element.style.cssText = `
        left: ${particle.x}px;
        top: ${particle.y}px;
        width: ${particle.size}px;
        height: ${particle.size}px;
        opacity: ${particle.opacity};
      `

      this.particlesContainer.appendChild(particle.element)
      this.particles.push(particle)
    }
  }

  getOptimalParticleCount() {
    const isMobile = window.innerWidth < 768
    const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4

    if (hasReducedMotion) return 0
    if (isMobile || isLowEnd) return 15
    return 30
  }

  setupEventListeners() {
    document.addEventListener("mousemove", (e) => {
      this.mouse.targetX = e.clientX / window.innerWidth
      this.mouse.targetY = e.clientY / window.innerHeight
    })

    window.addEventListener("resize", () => {
      this.handleResize()
    })
  }

  startAnimation() {
    this.animate()
  }

  animate() {
    if (!this.isActive) return

    this.time += 0.016

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.015
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.015

    this.updateMesh()
    this.updateOrbs()
    this.updateParticles()

    this.animationFrame = requestAnimationFrame(() => this.animate())
  }

  updateMesh() {
    const meshTransform = `
      translate(${this.mouse.x * 25 - 12.5}px, ${this.mouse.y * 25 - 12.5}px) 
      rotate(${this.mouse.x * 1.5}deg) 
      scale(${1 + this.mouse.x * 0.02})
    `
    this.mesh.style.transform = meshTransform
  }

  updateOrbs() {
    this.orbs.forEach((orb, index) => {
      const mouseInfluence = 0.08 + index * 0.015
      const timeOffset = index * 1.5
      const x = Math.sin(this.time * 0.3 + timeOffset) * 40 + this.mouse.x * mouseInfluence * 60
      const y = Math.cos(this.time * 0.2 + timeOffset) * 25 + this.mouse.y * mouseInfluence * 40
      const scale = 1 + Math.sin(this.time * 0.5 + timeOffset) * 0.08 + this.mouse.x * 0.05

      orb.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
      orb.style.opacity = 0.1 + this.mouse.x * 0.03 + this.mouse.y * 0.02
    })
  }

  updateParticles() {
    this.particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      const dx = this.mouse.x * window.innerWidth - particle.x
      const dy = this.mouse.y * window.innerHeight - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 250) {
        const force = ((250 - distance) / 250) * 0.008
        particle.vx += dx * force * 0.0008
        particle.vy += dy * force * 0.0008
      }

      if (particle.x < -10) particle.x = window.innerWidth + 10
      if (particle.x > window.innerWidth + 10) particle.x = -10
      if (particle.y < -10) particle.y = window.innerHeight + 10
      if (particle.y > window.innerHeight + 10) particle.y = -10

      particle.pulse += particle.pulseSpeed
      const pulseEffect = Math.sin(particle.pulse) * 0.4 + 0.8

      particle.element.style.transform = `
        translate3d(${particle.x}px, ${particle.y}px, 0) 
        scale(${pulseEffect})
      `
      particle.element.style.opacity = particle.opacity * pulseEffect
    })
  }

  handleResize() {
    this.particles.forEach((particle) => {
      if (particle.x > window.innerWidth) particle.x = window.innerWidth
      if (particle.y > window.innerHeight) particle.y = window.innerHeight
    })
  }

  pause() {
    this.isActive = false
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
  }

  resume() {
    if (!this.isActive) {
      this.isActive = true
      this.startAnimation()
    }
  }

  destroy() {
    this.pause()
    if (this.background && this.background.parentNode) {
      this.background.parentNode.removeChild(this.background)
    }
  }
}

class UltraRefinedCursor {
  constructor() {
    this.cursor = null
    this.mouse = { x: 0, y: 0 }
    this.cursorPos = { x: 0, y: 0 }
    this.isVisible = false

    this.init()
  }

  init() {
    if (window.matchMedia("(hover: none)").matches) {
      document.body.style.cursor = "auto"
      return
    }

    this.createCursor()
    this.setupEventListeners()
    this.startAnimation()
  }

  createCursor() {
    this.cursor = document.createElement("div")
    this.cursor.className = "custom-cursor"
    document.body.appendChild(this.cursor)
  }

  setupEventListeners() {
    document.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY

      if (!this.isVisible) {
        this.isVisible = true
        this.cursor.style.opacity = "1"
      }
    })

    document.addEventListener("mousedown", () => {
      this.cursor.classList.add("click")
    })

    document.addEventListener("mouseup", () => {
      this.cursor.classList.remove("click")
    })

    document.addEventListener("mouseleave", () => {
      this.isVisible = false
      this.cursor.style.opacity = "0"
    })

    const hoverElements = document.querySelectorAll(`
      a, button, .btn, .nav-link, .contact-link, .card, 
      .skill, .copy-btn, .status-badge, .avatar, 
      input, textarea, select
    `)

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.cursor.classList.add("hover")
      })
      el.addEventListener("mouseleave", () => {
        this.cursor.classList.remove("hover")
      })
    })
  }

  startAnimation() {
    this.updateCursor()
  }

  updateCursor() {
    this.cursorPos.x += (this.mouse.x - this.cursorPos.x) * 0.12
    this.cursorPos.y += (this.mouse.y - this.cursorPos.y) * 0.12

    this.cursor.style.left = this.cursorPos.x + "px"
    this.cursor.style.top = this.cursorPos.y + "px"

    requestAnimationFrame(() => this.updateCursor())
  }

  destroy() {
    if (this.cursor && this.cursor.parentNode) {
      this.cursor.parentNode.removeChild(this.cursor)
    }
  }
}

class UltraRefinedNavigation {
  constructor() {
    this.navToggle = document.getElementById("navToggle")
    this.navMenu = document.getElementById("navMenu")
    this.nav = document.querySelector(".nav")
    this.lastScrollY = 0
    this.isMenuOpen = false

    this.init()
  }

  init() {
    this.setupMobileMenu()
    this.setupSmoothNavigation()
    this.setupScrollEffects()
    this.setupScrollSpy()
  }

  setupMobileMenu() {
    this.navToggle?.addEventListener("click", () => {
      this.toggleMobileMenu()
    })

    document.addEventListener("click", (e) => {
      if (this.isMenuOpen && !this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
        this.closeMobileMenu()
      }
    })
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen
    this.navToggle.classList.toggle("active", this.isMenuOpen)
    this.navMenu.classList.toggle("active", this.isMenuOpen)
    document.body.classList.toggle("menu-open", this.isMenuOpen)
  }

  closeMobileMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false
      this.navToggle?.classList.remove("active")
      this.navMenu?.classList.remove("active")
      document.body.classList.remove("menu-open")
    }
  }

  setupSmoothNavigation() {
    document.addEventListener("click", (e) => {
      const target = e.target.closest("[data-target]")
      if (!target) return

      e.preventDefault()
      const sectionId = target.dataset.target
      const section = document.getElementById(sectionId)

      if (section) {
        this.scrollToSection(section)
        this.updateActiveNav(sectionId)
        this.closeMobileMenu()
      }
    })
  }

  scrollToSection(section) {
    const offsetTop = section.offsetTop - 80

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }

  setupScrollEffects() {
    let ticking = false

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll()
          ticking = false
        })
        ticking = true
      }
    })
  }

  handleScroll() {
    const currentScrollY = window.pageYOffset

    this.nav.classList.toggle("scrolled", currentScrollY > 100)

    if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
      this.nav.classList.add("hidden")
    } else {
      this.nav.classList.remove("hidden")
    }

    this.lastScrollY = currentScrollY
  }

  setupScrollSpy() {
    const sections = document.querySelectorAll(".section")
    const options = {
      threshold: 0.3,
      rootMargin: "-20% 0px -20% 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.updateActiveNav(entry.target.id)
        }
      })
    }, options)

    sections.forEach((section) => observer.observe(section))
  }

  updateActiveNav(activeId) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      const href = link.getAttribute("href")?.substring(1)
      link.classList.toggle("active", href === activeId)
    })
  }

  destroy() {
  }
}

class UltraRefinedScrollSystem {
  constructor() {
    this.sections = ["home", "about", "work", "contact"]
    this.currentSectionIndex = 0
    this.isScrolling = false

    this.init()
  }

  init() {
    this.createScrollIndicator()
    this.setupIntersectionObserver()
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

      const circumference = 2 * Math.PI * 22
      const offset = circumference - scrollPercentage * circumference
      progress.style.strokeDasharray = circumference
      progress.style.strokeDashoffset = offset

      indicator.classList.toggle("visible", scrollTop > 300)
    })

    indicator.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })

    this.scrollIndicator = indicator
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            this.triggerSectionAnimations(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "-80px 0px -80px 0px",
      },
    )

    document
      .querySelectorAll(`
      .section, .card, .contact-link, .section-header, 
      .skills-section, .skill, .avatar-section, .hero-text
    `)
      .forEach((el) => {
        observer.observe(el)
      })
  }

  triggerSectionAnimations(section) {
    const sectionId = section.id

    switch (sectionId) {
      case "work":
        setTimeout(() => this.animateSkills(), 300)
        break
      case "contact":
        setTimeout(() => this.animateContactCards(), 200)
        break
    }
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
          this.animateCounter(percent, 0, level, 1800)
        }
      }, index * 150)
    })
  }

  animateContactCards() {
    const cards = document.querySelectorAll(".contact-link")

    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("visible")
      }, index * 100)
    })
  }

  animateCounter(element, start, end, duration) {
    const startTime = performance.now()

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOut = 1 - Math.pow(1 - progress, 4)
      const current = Math.round(start + (end - start) * easeOut)

      element.textContent = `${current}%`

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      }
    }

    requestAnimationFrame(updateCounter)
  }

  navigateSection(direction) {
    if (this.isScrolling) return

    this.currentSectionIndex += direction

    if (this.currentSectionIndex < 0) {
      this.currentSectionIndex = 0
      return
    }

    if (this.currentSectionIndex >= this.sections.length) {
      this.currentSectionIndex = this.sections.length - 1
      return
    }

    const targetSection = document.getElementById(this.sections[this.currentSectionIndex])
    if (targetSection) {
      this.isScrolling = true

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      setTimeout(() => {
        this.isScrolling = false
      }, 1000)
    }
  }

  destroy() {
    if (this.scrollIndicator && this.scrollIndicator.parentNode) {
      this.scrollIndicator.parentNode.removeChild(this.scrollIndicator)
    }
  }
}

class UltraRefinedAnimations {
  constructor() {
    this.animatedElements = new Set()

    this.init()
  }

  init() {
    this.setupAdvancedAnimations()
    this.setupParallaxEffects()
    this.setupMicroInteractions()
  }

  setupAdvancedAnimations() {
    this.staggerElementsIn(".card", 100)
    this.staggerElementsIn(".skill", 80)
    this.staggerElementsIn(".contact-link", 120)
  }

  staggerElementsIn(selector, delay) {
    const elements = document.querySelectorAll(selector)

    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * delay}ms`

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in")
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2 },
      )

      observer.observe(el)
    })
  }

  setupParallaxEffects() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    let ticking = false

    const updateParallax = () => {
      const scrolled = window.pageYOffset

      const parallaxElements = [
        { selector: ".avatar-section", speed: 0.3 },
        { selector: ".hero-text", speed: 0.1 },
        { selector: ".section-header", speed: 0.05 },
      ]

      parallaxElements.forEach(({ selector, speed }) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((element) => {
          const yPos = -(scrolled * speed)
          element.style.transform += ` translateY(${yPos}px)`
        })
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

  setupMicroInteractions() {
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-2px) scale(1.02)"
      })

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = ""
      })

      btn.addEventListener("mousedown", () => {
        btn.style.transform = "translateY(0) scale(0.98)"
      })

      btn.addEventListener("mouseup", () => {
        btn.style.transform = "translateY(-2px) scale(1.02)"
      })
    })

    document.querySelectorAll(".card, .contact-link").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px) scale(1.01) rotateX(2deg)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = ""
      })
    })
  }

  handleResize() {
  }

  destroy() {
    this.animatedElements.clear()
  }
}

class PerformanceMonitor {
  constructor() {
    this.fps = 0
    this.frameCount = 0
    this.lastTime = performance.now()
    this.isMonitoring = false

    this.init()
  }

  init() {
    if (typeof performance !== "undefined" && performance.now) {
      this.startMonitoring()
    }
  }

  startMonitoring() {
    this.isMonitoring = true
    this.checkPerformance()
  }

  checkPerformance() {
    if (!this.isMonitoring) return

    this.frameCount++
    const currentTime = performance.now()
    const timeElapsed = currentTime - this.lastTime

    if (timeElapsed > 1000) {
      this.fps = Math.round((this.frameCount * 1000) / timeElapsed)

      if (this.fps < 30) {
        this.optimizePerformance()
      }

      this.frameCount = 0
      this.lastTime = currentTime
    }

    requestAnimationFrame(() => this.checkPerformance())
  }

  optimizePerformance() {
    const particles = document.querySelectorAll(".floating-particle")
    if (particles.length > 15) {
      for (let i = 15; i < particles.length; i++) {
        particles[i].remove()
      }
    }

    document.documentElement.style.setProperty("--transition", "all 100ms ease")
    document.documentElement.style.setProperty("--transition-slow", "all 200ms ease")
  }

  destroy() {
    this.isMonitoring = false
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.ultraRefinedPortfolio = new UltraRefinedPortfolio()
})

window.addEventListener("beforeunload", () => {
  if (window.ultraRefinedPortfolio) {
    window.ultraRefinedPortfolio.destroy()
  }
})

if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--transition", "all 100ms ease")
  document.documentElement.style.setProperty("--transition-slow", "all 200ms ease")
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.style.setProperty("--transition", "none")
  document.documentElement.style.setProperty("--transition-slow", "none")
  document.body.classList.add("reduced-motion")
}
