import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { loadPosts } from "../../ui/post/loadPosts.js";
import { readPostsByUser } from "../../api/post/read.js";
import { onDeletePost } from "../../ui/post/delete.js";
import { initializeBackToTop } from "../../ui/global/backToTop.js";
import { fetchProfile } from "../../api/profile/readProfile.js";
import { initializeUpdateProfileForm } from "../../ui/profile/updateProfileForm.js"; // Import new update logic

authGuard();
setLogoutListener();
initializeBackToTop();

const profilePostsContainer = document.querySelector("#profile-posts-container");
const bannerImage = document.getElementById("banner-image");
const avatarImage = document.getElementById("profile-avatar");
const usernameDisplay = document.getElementById("profile-username");
const bioDisplay = document.getElementById("profile-bio");
const welcomeMessage = document.getElementById("welcome-message");
const navContainer = document.querySelector(".nav-container");

// Get the username from the URL or fallback to the logged-in user
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username") || localStorage.getItem("username");

if (!username) {
  profilePostsContainer.innerHTML = "<p>Error: User not found.</p>";
} else {
  (async function () {
    try {
      const profileData = await fetchProfile(username);

      // Populate profile data
      bannerImage.style.backgroundImage = `url('${profileData.banner?.url || "/images/default-banner.jpg"}')`;
      avatarImage.src = profileData.avatar?.url || "/images/default-avatar.png";
      usernameDisplay.textContent = profileData.name || "Unknown User";
      bioDisplay.textContent = profileData.bio || "No bio available.";

      if (username === localStorage.getItem("username")) {
        welcomeMessage.textContent = "Welcome back!";
        navContainer.style.display = "block";

        // Initialize the update profile form for the logged-in user
        initializeUpdateProfileForm(username);
      } else {
        welcomeMessage.textContent = `${profileData.name || "User"}'s Profile`;
        navContainer.style.display = "none";

        const homeButton = document.createElement("a");
        homeButton.href = "/";
        homeButton.className = "nav-style";
        homeButton.textContent = "Home";

        const yourPostsHeading = document.getElementById("your-posts-heading");
        if (yourPostsHeading) {
          yourPostsHeading.parentElement.insertBefore(homeButton, yourPostsHeading);
        }
      }

      // Load posts for the current profile
      loadPosts(profilePostsContainer, async (limit, page, tag) =>
        readPostsByUser(username, limit, page, tag)
      );
    } catch (error) {
      console.error("Error loading profile data:", error);
      profilePostsContainer.innerHTML = "<p>Error loading profile. Please try again later.</p>";
    }
  })();
}

// Attach delete post functionality
profilePostsContainer.addEventListener("click", onDeletePost);
