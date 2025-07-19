document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll()
  initMobileMenu()
  initRevealAnimations()
  initCodeHighlighting()
  setCurrentYear()
  console.log("Main script initialized")
  ensureCircuitBackgroundVisibility()
})

function initHeaderScroll() {
  const header = document.querySelector(".site-header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })
}
  
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle")
  const mainNav = document.querySelector(".main-nav")
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      mainNav.classList.toggle("active")
      const isExpanded = mainNav.classList.contains("active")
      menuToggle.setAttribute("aria-expanded", isExpanded)
    })
    document.addEventListener("click", (event) => {
      if (
        !event.target.closest(".main-nav") &&
        !event.target.closest(".menu-toggle") &&
        mainNav.classList.contains("active")
      ) {
        mainNav.classList.remove("active")
        menuToggle.classList.remove("active")
        menuToggle.setAttribute("aria-expanded", false)
      }
    })
  }
}

function initRevealAnimations() {
  if (!("IntersectionObserver" in window)) {
    const revealElements = document.querySelectorAll(".reveal-element")
    revealElements.forEach((el) => el.classList.add("visible"))
    return
  }
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          if (entry.target.classList.contains("code-container")) {
            animateCodeLines(entry.target)
          }
          revealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )
  const revealElements = document.querySelectorAll(".reveal-element")
  revealElements.forEach((el) => {
    revealObserver.observe(el)
  })
}

function animateCodeLines(codeContainer) {
  const codeElement = codeContainer.querySelector("code")
  if (!codeElement) return
  const codeText = codeElement.textContent
  const codeLines = codeText.split("\n")
  codeElement.textContent = ""
  codeLines.forEach((line, index) => {
    const lineSpan = document.createElement("span")
    lineSpan.textContent = line + (index < codeLines.length - 1 ? "\n" : "")
    lineSpan.classList.add("reveal-code")
    lineSpan.style.animationDelay = `${index * 100}ms`
    codeElement.appendChild(lineSpan)
    setTimeout(() => {
      lineSpan.classList.add("visible")
    }, 50)
  })
}

function initCodeHighlighting() {
  const codeBlocks = document.querySelectorAll("pre code")
  codeBlocks.forEach((block) => {
    const language = block.className.replace("language-", "")
    if (language === "javascript") {
      highlightJavaScript(block)
    } else if (language === "swift") {
      highlightSwift(block)
    } else if (language === "python") {
      highlightPython(block)
    }
  })
}

function highlightJavaScript(codeBlock) {
  let html = codeBlock.innerHTML
  const keywords = [
    "class",
    "constructor",
    "function",
    "const",
    "let",
    "var",
    "return",
    "if",
    "else",
    "for",
    "while",
    "this",
    "new",
    "import",
    "export",
    "default",
  ]
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "g")
    html = html.replace(regex, `<span class="keyword">${keyword}</span>`)
  })
  html = html.replace(/'([^']*)'/g, "<span class=\"string\">'$1'</span>")
  html = html.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
  html = html.replace(/\/\/(.*)/g, '<span class="comment">// $1</span>')
  html = html.replace(/(\w+)(\s*\()/g, '<span class="function">$1</span>$2')
  codeBlock.innerHTML = html
}

function highlightSwift(codeBlock) {
  let html = codeBlock.innerHTML
  const keywords = [
    "class",
    "func",
    "var",
    "let",
    "return",
    "if",
    "else",
    "for",
    "while",
    "self",
    "init",
    "private",
    "public",
    "internal",
    "import",
  ]
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "g")
    html = html.replace(regex, `<span class="keyword">${keyword}</span>`)
  })
  html = html.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
  html = html.replace(/\/\/(.*)/g, '<span class="comment">// $1</span>')
  html = html.replace(/(\w+)(\s*\()/g, '<span class="function">$1</span>$2')
  codeBlock.innerHTML = html
}

function highlightPython(codeBlock) {
  let html = codeBlock.innerHTML
  const keywords = [
    "def",
    "class",
    "return",
    "if",
    "else",
    "for",
    "while",
    "in",
    "import",
    "from",
    "as",
    "True",
    "False",
    "None",
  ]
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "g")
    html = html.replace(regex, `<span class="keyword">${keyword}</span>`)
  })
  html = html.replace(/'([^']*)'/g, "<span class=\"string\">'$1'</span>")
  html = html.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
  html = html.replace(/#(.*)/g, '<span class="comment"># $1</span>')
  html = html.replace(/(\w+)(\s*\()/g, '<span class="function">$1</span>$2')
  codeBlock.innerHTML = html
}

function setCurrentYear() {
  const yearElement = document.getElementById("current-year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
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
  const body = document.body
  if (isMobile) {
    body.classList.add("is-mobile")
  }
  if (!supportsHardware) {
    body.classList.add("no-hardware-acceleration")
  }
  if (hasReducedMotion) {
    body.classList.add("reduced-motion")
  }
  return {
    isMobile,
    hasReducedMotion,
    supportsHardware,
  }
}

window.addEventListener("load", optimizeForDevice)

function ensureCircuitBackgroundVisibility() {
  const circuitBackground = document.querySelector(".circuit-background")
  if (circuitBackground) {
    if (Number.parseFloat(getComputedStyle(circuitBackground).opacity) < 0.05) {
      circuitBackground.style.opacity = "var(--circuit-opacity)"
    }
    if (typeof initCircuitBackground !== "function") {
      console.error("Circuit animation script not loaded properly")
      document.documentElement.classList.add("js-circuit-failed")
    }
  } else {
    console.error("Circuit background element not found")
  }
}
