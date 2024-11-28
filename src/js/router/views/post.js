import { authGuard } from "../../utilities/authGuard.js";
import { renderPosts } from "../../api/post/renderPosts.js";
import { readPost } from "../../api/post/read.js";
import { onDeletePost } from "../../ui/post/delete.js";
import { initializeReactionButtons } from "../../api/post/react.js";
import { initializeCommentButtons } from "../../api/post/comment.js"; // Import comment initializer

authGuard();

const postContainer = document.querySelector("#post-container");

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

if (postId) {
  (async function () {
    try {
      const post = await readPost(postId);
      renderPosts(postContainer, [post]);

      // Initialize reaction buttons
      initializeReactionButtons();

      // Initialize comment buttons
      initializeCommentButtons();
    } catch (error) {
      console.error("Error fetching or rendering the post:", error);
      postContainer.innerHTML = `<p>Error loading the post: ${error.message}</p>`;
    }
  })();
} else {
  postContainer.innerHTML = "<p>Post ID is missing in the URL.</p>";
}

// Attach delete post functionality
postContainer.addEventListener("click", onDeletePost);
