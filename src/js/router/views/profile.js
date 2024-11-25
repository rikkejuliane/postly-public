import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { loadPosts } from "../../ui/post/loadPosts.js";
import { readPostsByUser } from "../../api/post/read.js";
import { onDeletePost } from "../../ui/post/delete.js"; // Import the delete handler

authGuard();
setLogoutListener();

const profilePostsContainer = document.querySelector(
  "#profile-posts-container"
);
const currentUser = localStorage.getItem("username");

if (currentUser) {
  loadPosts(profilePostsContainer, async (limit, page, tag) =>
    readPostsByUser(currentUser, limit, page, tag)
  );
} else {
  profilePostsContainer.innerHTML = "<p>Error: User not found.</p>";
}

profilePostsContainer.addEventListener("click", onDeletePost);
