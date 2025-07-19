
class UltraModernPortfolio {
  constructor() {
    this.init()
  }

  init() {
    this.setupNavigation()
    this.setupIntersectionObserver()
    this.setupSkillAnimations()
    this.setCurrentYear()
    this.setupParallax()
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
      if (target === null) return

      e.preventDefault()
      const sectionId = target.dataset.target
      const section = document.getElementById(sectionId)

      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
        this.updateActiveNav(sectionId)
      }

      navToggle.classList.remove("active")
      navMenu.classList.remove("active")
    })

    window.addEventListener("scroll", () => {
      this.updateNavOnScroll()
    })
  }

  updateActiveNav(activeId) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      const href = link.getAttribute("href").substring(1)
      link.classList.toggle("active", href === activeId)
    })
  }

  updateNavOnScroll() {
    const sections = document.querySelectorAll(".section")
    const scrollPos = window.scrollY + window.innerHeight / 2

    sections.forEach((section) => {
      const top = section.offsetTop
      const bottom = top + section.offsetHeight

      if (scrollPos >= top && scrollPos <= bottom) {
        this.updateActiveNav(section.id)
      }
    })
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
            if (entry.target.id === "skills") {
              this.animateSkills()
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: "-50px" },
    )

    document.querySelectorAll(".section").forEach((section) => {
      section.style.opacity = "0"
      section.style.transform = "translateY(20px)"
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(section)
    })

    document.querySelectorAll(".about-card, .contact-card").forEach((card, index) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
      observer.observe(card)
    })
  }

  setupSkillAnimations() {
  }

  animateSkills() {
    const skillItems = document.querySelectorAll(".skill-item")

    skillItems.forEach((item, index) => {
      setTimeout(() => {
        const skillLevel = Number.parseInt(item.dataset.skill)
        const progressBar = item.querySelector(".skill-progress")
        const valueElement = item.querySelector(".skill-value")

        if (progressBar && valueElement) {
          progressBar.style.width = `${skillLevel}%`
          this.animateCounter(valueElement, 0, skillLevel, 1000)
        }
      }, index * 100)
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

  setupParallax() {
    let ticking = false

    const updateParallax = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".hero-left")

      parallaxElements.forEach((element) => {
        const speed = 0.5
        const yPos = -(scrolled * speed)
        element.style.transform = `translateY(${yPos}px)`
      })

      ticking = false
    }

    window.addEventListener("scroll", () => {
      if (ticking === false) {
        requestAnimationFrame(updateParallax)
        ticking = true
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
  new UltraModernPortfolio()
})

document.addEventListener("click", (e) => {
  if (e.target.closest(".code-action")) {
    const codeBlock = e.target.closest(".code-block")
    const code = codeBlock.querySelector("code").textContent

    navigator.clipboard.writeText(code).then(() => {
      const button = e.target.closest(".code-action")
      const originalHTML = button.innerHTML
      button.innerHTML =
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>'

      setTimeout(() => {
        button.innerHTML = originalHTML
      }, 1000)
    })
  }
})

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const navToggle = document.getElementById("navToggle")
    const navMenu = document.getElementById("navMenu")

    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  }
})
