import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { renderPosts, readPostsByUser } from "../../api/post/read.js";

// Ensure the user is authenticated
authGuard();

// Set up the logout button functionality
setLogoutListener();

// Select the container for rendering the user's posts
const profilePostsContainer = document.querySelector("#profile-posts-container");

// Fetch and render the user's posts
const currentUser = localStorage.getItem("username"); // Ensure username is stored after login

if (currentUser) {
  renderPosts(profilePostsContainer, async (limit, page, tag) =>
    readPostsByUser(currentUser, limit, page, tag)
  );
} else {
  profilePostsContainer.innerHTML = "<p>Error: User not found.</p>";
}

