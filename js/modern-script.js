
class ModernPortfolio {
  constructor() {
    this.currentSection = "home"
    this.isScrolling = false
    this.particles = []
    this.mouse = { x: 0, y: 0 }

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.initParticles()
    this.initIntersectionObserver()
    this.initParallax()
    this.initTypewriter()
    this.setCurrentYear()
    this.initSkillBars()
    this.animateOnLoad()
  }

  setupEventListeners() {
    document.addEventListener("click", this.handleNavigation.bind(this))

    const navToggle = document.getElementById("navToggle")
    const navMenu = document.getElementById("navMenu")

    navToggle?.addEventListener("click", () => {
      navToggle.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    window.addEventListener("scroll", this.handleScroll.bind(this))
    document.addEventListener("mousemove", this.handleMouseMove.bind(this))
    window.addEventListener("resize", this.handleResize.bind(this))
    document.addEventListener("keydown", this.handleKeyboard.bind(this))
  }

  handleNavigation(e) {
    const target = e.target.closest("[data-section]")
    if (target === null) return

    e.preventDefault()
    const section = target.dataset.section
    this.navigateToSection(section)
  }

  navigateToSection(sectionId) {
    if (this.isScrolling) return

    this.isScrolling = true
    this.currentSection = sectionId

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.section === sectionId)
    })

    const targetSection = document.getElementById(sectionId)
    if (targetSection !== null) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    setTimeout(() => {
      this.isScrolling = false
    }, 1000)
  }

  handleScroll() {
    const navbar = document.querySelector(".navbar")
    const scrolled = window.scrollY > 50

    navbar.classList.toggle("scrolled", scrolled)

    if (this.isScrolling === false) {
      this.updateActiveSection()
    }

    this.updateParallax()
  }

  updateActiveSection() {
    const sections = document.querySelectorAll(".section")
    const scrollPos = window.scrollY + window.innerHeight / 2

    sections.forEach((section) => {
      const top = section.offsetTop
      const bottom = top + section.offsetHeight

      if (scrollPos >= top && scrollPos <= bottom) {
        const sectionId = section.id
        if (sectionId !== this.currentSection) {
          this.currentSection = sectionId

          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.toggle("active", link.dataset.section === sectionId)
          })
        }
      }
    })
  }

  handleMouseMove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1
  }

  handleResize() {
    this.initParticles()
  }

  handleKeyboard(e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      const sections = ["home", "about", "skills", "social"]
      const currentIndex = sections.indexOf(this.currentSection)

      let nextIndex
      if (e.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % sections.length
      } else {
        nextIndex = (currentIndex - 1 + sections.length) % sections.length
      }

      this.navigateToSection(sections[nextIndex])
    }
  }

  initIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
            const sectionId = entry.target.id
            this.triggerSectionAnimations(sectionId)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "-10% 0px",
      },
    )

    document.querySelectorAll(".section").forEach((section) => {
      observer.observe(section)
    })
  }

  triggerSectionAnimations(sectionId) {
    switch (sectionId) {
      case "home":
        this.animateHeroElements()
        break
      case "about":
        this.animateAboutCards()
        break
      case "skills":
        this.animateSkillBars()
        break
      case "social":
        this.animateSocialCards()
        break
    }
  }

  animateOnLoad() {
    const elements = document.querySelectorAll(".hero-content > *")
    elements.forEach((el, index) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"

      setTimeout(() => {
        el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, index * 200)
    })
  }

  animateHeroElements() {
    const avatar = document.querySelector(".avatar-container")
    const text = document.querySelector(".hero-text")

    if (avatar !== null) {
      avatar.style.animation = "fadeInUp 1s ease-out"
    }

    if (text !== null) {
      text.style.animation = "slideInRight 1s ease-out 0.3s both"
    }
  }

  animateAboutCards() {
    const cards = document.querySelectorAll(".about-card")
    cards.forEach((card, index) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"

      setTimeout(() => {
        card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, index * 150)
    })
  }

  animateSkillBars() {
    const skillCards = document.querySelectorAll(".skill-card")

    skillCards.forEach((card, index) => {
      setTimeout(() => {
        const skillLevel = Number.parseInt(card.dataset.skill)
        const progressBar = card.querySelector(".skill-progress")
        const percentageText = card.querySelector(".skill-percentage")

        if (progressBar !== null && percentageText !== null) {
          progressBar.style.width = `${skillLevel}%`
          this.animateCounter(percentageText, 0, skillLevel, 1500)
        }
      }, index * 100)
    })
  }

  animateSocialCards() {
    const cards = document.querySelectorAll(".social-card")
    cards.forEach((card, index) => {
      card.style.opacity = "0"
      card.style.transform = "translateX(-30px)"

      setTimeout(() => {
        card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        card.style.opacity = "1"
        card.style.transform = "translateX(0)"
      }, index * 200)
    })
  }

  animateCounter(element, start, end, duration) {
    const startTime = performance.now()

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(start + (end - start) * easeOutCubic)

      element.textContent = `${current}%`

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      }
    }

    requestAnimationFrame(updateCounter)
  }

  initParallax() {
    const parallaxElements = document.querySelectorAll(".hero-avatar, .about-visual")

    const updateParallax = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5

      parallaxElements.forEach((element) => {
        element.style.transform = `translateY(${rate}px)`
      })
    }

    window.addEventListener("scroll", updateParallax)
  }

  updateParallax() {
    const heroElements = document.querySelectorAll(".hero-avatar, .hero-text")

    heroElements.forEach((element, index) => {
      const depth = (index + 1) * 0.1
      const moveX = this.mouse.x * depth * 20
      const moveY = this.mouse.y * depth * 20

      element.style.transform += ` translate3d(${moveX}px, ${moveY}px, 0)`
    })
  }

  initParticles() {
    const canvas = document.getElementById("particleCanvas")
    if (canvas === null) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    this.particles = []

    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20))

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      this.particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
        ctx.fill()
      })

      this.particles.forEach((particle, i) => {
        this.particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()
  }

  initTypewriter() {
    const codeElement = document.getElementById("heroCode")
    if (codeElement === null) return

    const text = codeElement.textContent
    codeElement.textContent = ""

    let index = 0
    const typeSpeed = 30

    const typeWriter = () => {
      if (index < text.length) {
        codeElement.textContent += text.charAt(index)
        index++
        setTimeout(typeWriter, typeSpeed)
      } else {
        this.applySyntaxHighlighting(codeElement)
      }
    }

    setTimeout(typeWriter, 1000)
  }

  applySyntaxHighlighting(element) {
    let html = element.textContent

    html = html.replace(/\b(struct|let|func|return)\b/g, '<span style="color: #ff79c6;">$1</span>')
    html = html.replace(/"([^"]*)"/g, '<span style="color: #f1fa8c;">"$1"</span>')
    html = html.replace(/(\/\/.*)/g, '<span style="color: #6272a4;">$1</span>')

    element.innerHTML = html
  }

  initSkillBars() {
  }

  setCurrentYear() {
    const yearElement = document.getElementById("currentYear")
    if (yearElement !== null) {
      yearElement.textContent = new Date().getFullYear()
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ModernPortfolio()
})

if (CSS.supports("scroll-behavior", "smooth") === false) {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const target = document.querySelector(link.getAttribute("href"))

      if (target !== null) {
        const targetPosition = target.offsetTop
        const startPosition = window.pageYOffset
        const distance = targetPosition - startPosition
        const duration = 1000
        let start = null

        const step = (timestamp) => {
          if (start === null) start = timestamp
          const progress = timestamp - start
          const ease = easeInOutCubic(progress / duration)

          window.scrollTo(0, startPosition + distance * ease)

          if (progress < duration) {
            requestAnimationFrame(step)
          }
        }

        requestAnimationFrame(step)
      }
    })
  })
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--transition-normal", "150ms")
  document.documentElement.style.setProperty("--transition-slow", "300ms")
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.style.setProperty("--transition-fast", "0ms")
  document.documentElement.style.setProperty("--transition-normal", "0ms")
  document.documentElement.style.setProperty("--transition-slow", "0ms")
}
