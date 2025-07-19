document.addEventListener("DOMContentLoaded", () => {
  initStars()
  initCodeHighlighting()
  initNavigation()
  initMobileMenu()
  initCustomCursor()
  initScrollIndicator()
  initParallaxEffect()
  initButtonRippleEffect()
  document.querySelector(".profile-section").classList.add("fade-in")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )
  const skillsSection = document.getElementById("skillsSection")
  if (skillsSection) {
    observer.observe(skillsSection)
  }
})

function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle")
  const mainNav = document.querySelector(".main-nav")
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true"
      menuToggle.setAttribute("aria-expanded", !isExpanded)
      menuToggle.classList.toggle("active")
      mainNav.classList.toggle("active")
      document.body.classList.toggle("menu-open")
    })
    const navLinks = mainNav.querySelectorAll("a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false")
        menuToggle.classList.remove("active")
        mainNav.classList.remove("active")
        document.body.classList.remove("menu-open")
      })
    })
    document.addEventListener("click", (event) => {
      if (
        mainNav.classList.contains("active") &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        menuToggle.setAttribute("aria-expanded", "false")
        menuToggle.classList.remove("active")
        mainNav.classList.remove("active")
        document.body.classList.remove("menu-open")
      }
    })
  }
}

function initStars() {
  const stars = document.getElementById("stars")
  const count = 100
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div")
    const size = Math.random() * 2
    star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: #ffffff;
            opacity: ${Math.random() * 0.7 + 0.3};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            border-radius: 50%;
            animation: twinkle ${Math.random() * 5 + 3}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `
    stars.appendChild(star)
  }
  const style = document.createElement("style")
  style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
    `
  document.head.appendChild(style)
}

function initCodeHighlighting() {
  const codeBlocks = document.querySelectorAll(".code-block code")
  codeBlocks.forEach((block) => {
    block.innerHTML = block.innerHTML
      .replace(/\b(const|function|return|if|else|for|while|var|let)\b/g, '<span class="keyword">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
      .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
      .replace(/(\/\*\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
      .replace(/(\w+)(?=\s*\()/g, '<span class="function">$1</span>')
      .replace(/\b(const|let|var)\s+(\w+)\b/g, '<span class="keyword">$1</span> <span class="variable">$2</span>')
  })
}

function initNavigation() {
  const aboutBtn = document.getElementById("aboutBtn")
  const skillsBtn = document.getElementById("skillsBtn")
  const aboutSection = document.getElementById("aboutSection")
  const skillsSection = document.getElementById("skillsSection")
  const developmentSection = document.getElementById("developmentSection")
  const socialSection = document.getElementById("socialSection")
  const profileSection = document.querySelector(".profile-section")
  aboutBtn.addEventListener("click", () => {
    hideAllSections()
    aboutSection.style.display = "block"
    aboutSection.classList.add("slide-up")
    developmentSection.style.display = "block"
    developmentSection.classList.add("slide-up")
    aboutSection.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      typeCode(document.getElementById("aboutCode"), document.getElementById("aboutCode").textContent, 10)
      setTimeout(() => {
        document.getElementById("aboutText1").classList.add("visible")
        setTimeout(() => {
          document.getElementById("aboutText2").classList.add("visible")
          setTimeout(() => {
            document.getElementById("aboutText3").classList.add("visible")
          }, 500)
        }, 500)
      }, 2000)
    }, 500)
  })
  skillsBtn.addEventListener("click", () => {
    hideAllSections()
    skillsSection.style.display = "block"
    skillsSection.classList.add("slide-up")
    skillsSection.scrollIntoView({ behavior: "smooth" })
    setTimeout(animateSkillBars, 500)
  })
  function hideAllSections() {
    aboutSection.style.display = "none"
    skillsSection.style.display = "none"
    developmentSection.style.display = "none"
    socialSection.style.display = "none"
    aboutSection.classList.remove("slide-up")
    skillsSection.classList.remove("slide-up")
    developmentSection.classList.remove("slide-up")
    socialSection.classList.remove("slide-up")
    document.getElementById("aboutText1").classList.remove("visible")
    document.getElementById("aboutText2").classList.remove("visible")
    document.getElementById("aboutText3").classList.remove("visible")
    resetSkillBars()
  }
  const navLinks = document.querySelectorAll(".main-nav a")
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      navLinks.forEach((l) => l.classList.remove("active"))
      link.classList.add("active")
      const target = link.getAttribute("href").substring(1)
      if (target === "about") {
        aboutBtn.click()
      } else if (target === "skills") {
        skillsBtn.click()
      } else if (target === "social") {
        hideAllSections()
        socialSection.style.display = "block"
        socialSection.classList.add("slide-up")
        socialSection.scrollIntoView({ behavior: "smooth" })
      } else if (target === "home") {
        hideAllSections()
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    })
  })
}

function resetSkillBars() {
  const skillLevels = document.querySelectorAll(".skill-level")
  const percentages = document.querySelectorAll(".skill-percentage")
  const skills = document.querySelectorAll(".skill")
  skillLevels.forEach((level) => {
    level.style.width = "0%"
  })
  percentages.forEach((percentage) => {
    percentage.textContent = "0%"
  })
  skills.forEach((skill) => {
    skill.classList.remove("visible")
  })
}

function animateSkillBars() {
  const skillLevels = document.querySelectorAll(".skill-level")
  const percentages = document.querySelectorAll(".skill-percentage")
  const skills = document.querySelectorAll(".skill")
  skills.forEach((skill, index) => {
    setTimeout(() => {
      skill.classList.add("visible")
    }, index * 200)
  })
  skillLevels.forEach((level, index) => {
    const targetWidth = level.getAttribute("data-level") + "%"
    const targetPercentage = Number.parseInt(level.getAttribute("data-level"))
    let currentPercentage = 0
    const interval = setInterval(() => {
      if (currentPercentage >= targetPercentage) {
        clearInterval(interval)
        return
      }
      currentPercentage++
      percentages[index].textContent = currentPercentage + "%"
      level.style.width = (currentPercentage / targetPercentage) * Number.parseInt(targetWidth) + "%"
      if (currentPercentage >= targetPercentage) {
        level.style.width = targetWidth
      }
    }, 30)
  })
}

function typeCode(element, text, speed = 30) {
  element.textContent = ""
  let i = 0
  const typing = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
    } else {
      clearInterval(typing)
      element.innerHTML = element.textContent
        .replace(/\b(const|function|return|if|else|for|while|var|let)\b/g, '<span class="keyword">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
        .replace(/(\/\*\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
        .replace(/(\w+)(?=\s*\()/g, '<span class="function">$1</span>')
        .replace(/\b(const|let|var)\s+(\w+)\b/g, '<span class="keyword">$1</span> <span class="variable">$2</span>')
    }
  }, speed)
}

function initCustomCursor() {
  const cursor = document.createElement("div")
  cursor.classList.add("custom-cursor")
  document.body.appendChild(cursor)
  if (!("ontouchstart" in window)) {
    cursor.classList.add("active")
    document.addEventListener("mousemove", (e) => {
      requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
      })
    })
    const interactiveElements = document.querySelectorAll("a, button, .btn, .social-card")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hover")
      })
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover")
      })
    })
  }
}

function initScrollIndicator() {
  const indicator = document.createElement("div")
  indicator.classList.add("scroll-indicator")
  const progressBar = document.createElement("div")
  progressBar.classList.add("scroll-indicator-progress")
  indicator.appendChild(progressBar)
  document.body.appendChild(indicator)
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercentage = scrollTop / scrollHeight
    progressBar.style.transform = `rotate(${scrollPercentage * 360}deg)`
    if (scrollTop > 100) {
      indicator.classList.add("visible")
    } else {
      indicator.classList.remove("visible")
    }
  })
}

function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll(".profile-image, .username, .tagline")
  window.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5
    const mouseY = e.clientY / window.innerHeight - 0.5
    parallaxElements.forEach((el) => {
      const depth = Number.parseFloat(el.getAttribute("data-depth") || 0.1)
      const moveX = mouseX * depth * 30
      const moveY = mouseY * depth * 30
      requestAnimationFrame(() => {
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`
      })
    })
  })
  document.querySelector(".profile-image").setAttribute("data-depth", "0.2")
  document.querySelector(".username").setAttribute("data-depth", "0.1")
  document.querySelector(".tagline").setAttribute("data-depth", "0.05")
}

function initButtonRippleEffect() {
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const ripple = document.createElement("span")
      ripple.classList.add("ripple")
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      button.appendChild(ripple)
      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
}

let lastScrollTop = 0
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY
  const header = document.querySelector(".site-header")
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    header.classList.add("hidden")
  } else {
    header.classList.remove("hidden")
  }
  lastScrollTop = scrollTop
})
