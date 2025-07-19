
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle")
  const mainNav = document.querySelector(".main-nav")

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      mainNav.classList.toggle("active")
      document.body.classList.toggle("menu-open")
    })

    document.addEventListener("click", (event) => {
      if (
        mainNav.classList.contains("active") &&
        mainNav.contains(event.target) === false &&
        menuToggle.contains(event.target) === false
      ) {
        menuToggle.classList.remove("active")
        mainNav.classList.remove("active")
        document.body.classList.remove("menu-open")
      }
    })

    const navLinks = mainNav.querySelectorAll("a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        mainNav.classList.remove("active")
        document.body.classList.remove("menu-open")
      })
    })
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")

      if (targetId !== "#") {
        e.preventDefault()

        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      }
    })
  })
})
