import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { renderPosts, readPostsByUser } from "../../api/post/read.js";

authGuard();

setLogoutListener();

const profilePostsContainer = document.querySelector(
  "#profile-posts-container"
);

const currentUser = localStorage.getItem("username");

if (currentUser) {
  renderPosts(profilePostsContainer, async (limit, page, tag) =>
    readPostsByUser(currentUser, limit, page, tag)
  );
} else {
  profilePostsContainer.innerHTML = "<p>Error: User not found.</p>";
}
