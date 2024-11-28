import { deletePost } from "../../api/post/delete.js";
/**
 * Handles the deletion of a post when the delete button is clicked.
 *
 * - Confirms the user's intent to delete the post.
 * - Calls the `deletePost` API function to delete the post by its ID.
 * - Removes the post element from the DOM if it is still visible.
 * - Notifies the user upon successful deletion and redirects to the homepage.
 * - Displays an error message if the deletion fails.
 *
 * @async
 * @param {Event} event - The click event triggered on the delete button.
 * @throws {Error} If the API request fails or another error occurs during deletion.
 * @returns {void}
 */
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
      if (postElement) {
        postElement.remove();
      }
      alert("Post deleted successfully.");
      window.location.href = "/";
    } catch (error) {
      alert("Error deleting post: " + error.message);
    }
  }
}
