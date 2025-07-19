
document.addEventListener("DOMContentLoaded", () => {
  initSkillBars()
})

function initSkillBars() {
  const skillCards = document.querySelectorAll(".skill-card")

  if (skillCards.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBar(entry.target)
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2,
    },
  )

  skillCards.forEach((card) => {
    observer.observe(card)
  })
}

function animateSkillBar(card) {
  const skillLevel = card.getAttribute("data-skill-level")
  const progressBar = card.querySelector(".skill-progress")
  const percentageText = card.querySelector(".skill-percentage")

  if (!progressBar || !percentageText) return

  progressBar.style.width = `${skillLevel}%`

  let currentPercentage = 0
  const targetPercentage = Number.parseInt(skillLevel)
  const duration = 1500
  const interval = 20
  const steps = duration / interval
  const increment = targetPercentage / steps

  const timer = setInterval(() => {
    currentPercentage += increment

    if (currentPercentage >= targetPercentage) {
      currentPercentage = targetPercentage
      clearInterval(timer)
    }

    percentageText.textContent = `${Math.round(currentPercentage)}%`
  }, interval)
}
