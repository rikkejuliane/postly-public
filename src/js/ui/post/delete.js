import { deletePost } from "../../api/post/delete.js";
import { openModal } from "../../ui/global/modalMessage.js";

/**
 * Handles the deletion of a post when the delete button is clicked.
 *
 * - Confirms the user's intent to delete the post.
 * - Calls the `deletePost` API function to delete the post by its ID.
 * - Immediately removes the post element from the DOM upon successful deletion.
 * - Displays a success or error modal based on the result.
 *
 * @async
 * @param {Event} event - The click event triggered on the delete button.
 * @returns {void}
 */
export async function onDeletePost(event) {
  if (event.target.classList.contains("post-card-delete")) {
    const postId = event.target.dataset.id;

    openModal({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this post?",
      confirmText: "Yes",
      cancelText: "No",
      onConfirm: async () => {
        try {
          await deletePost(postId);

          openModal({
            title: "Post Deleted",
            content: "Your post has been successfully deleted.",
            confirmText: "OK",
            onConfirm: () => {
              window.location.reload();
            },
          });
        } catch (error) {
          console.error("Error deleting post:", error);

          openModal({
            title: "Error",
            content: `Failed to delete the post. Please try again later.`,
            confirmText: "OK",
          });
        }
      },
    });
  }
}