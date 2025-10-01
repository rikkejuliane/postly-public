import { updatePost } from "../../api/post/update.js";
import { openModal } from "../../ui/global/modalMessage.js";
/**
 * Handles the submission of the edit post form.
 *
 * - Prevents the default form submission behavior.
 * - Confirms the user's intent to update the post.
 * - Collects form data and constructs the post object, including optional media and tags.
 * - Sends the updated post data to the `updatePost` API function.
 * - Redirects the user to the updated post page upon success.
 * - Logs an error if the update fails.
 *
 * @async
 * @param {Event} event - The submit event from the form.
 * @throws {Error} If the API request to update the post fails.
 * @returns {void}
 */
export async function onUpdatePost(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const postId = new URLSearchParams(window.location.search).get("id");
  const mediaUrl = formData.get("media");
  const mediaAlt = formData.get("alt");
  const post = {
    title: formData.get("title"),
    body: formData.get("body"),
    tags: formData.get("tags")
      ? formData
        .get("tags")
        .split(",")
        .map((tag) => tag.trim())
      : [],
    media: mediaUrl
      ? {
        url: mediaUrl,
        alt: mediaAlt,
      }
      : null,
  };

  openModal({
    title: "Confirm Update",
    content: "Are you sure you want to update this post?",
    confirmText: "Yes",
    cancelText: "No",
    onConfirm: async () => {
      try {
        const result = await updatePost(postId, post);
        if (result) {
          openModal({
            title: "Post Updated",
            content: "Your post has been updated successfully.",
            confirmText: "OK",
            onConfirm: () => {
              const previousPage = document.referrer || "/";
              window.location.href = previousPage;
            },
          });
        }
      } catch (error) {
        console.error("Error updating post:", error);
        openModal({
          title: "Error",
          content: `Failed to update post: ${error.message}`,
          confirmText: "OK",
        });
      }
    },
  });
}