
document.addEventListener("DOMContentLoaded", () => {
  fetchGitHubAvatar()
})

async function fetchGitHubAvatar() {
  const avatarImg = document.getElementById("github-avatar")
  const avatarLoader = document.querySelector(".avatar-loader")

  if (!avatarImg) return

  try {
    const username = "x6x3"
    const response = await fetch(`https://api.github.com/users/${username}`)

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub profile")
    }

    const data = await response.json()

    if (data.avatar_url) {
      avatarImg.src = data.avatar_url
      avatarImg.alt = `${username}'s GitHub profile picture`

      avatarImg.onload = () => {
        if (avatarLoader) {
          avatarLoader.style.display = "none"
        }
      }
    } else {
      throw new Error("No avatar found")
    }
  } catch (error) {
    console.error("Error fetching GitHub avatar:", error)

    avatarImg.src = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    avatarImg.alt = "Default GitHub profile picture"

    if (avatarLoader) {
      avatarLoader.style.display = "none"
    }
  }
}
