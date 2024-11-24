/**
 * Passses data to the createPost function in api/post and handles the response
 */
import { deletePost } from "../../api/post/delete.js";

export async function onDeletePost(event) {
  if (event.target.classList.contains("post-card-delete")) {
    const postId = event.target.dataset.id;

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await deletePost(postId);

      const postElement = event.target.closest(".post-card");
      postElement.remove();

      alert("Post deleted successfully.");
    } catch (error) {
      alert("Error deleting post: " + error.message);
    }
  }
}
