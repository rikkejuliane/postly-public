import { updatePost } from "../../api/post/update.js";
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
  if (!confirm("Confirm post update?")) {
    return;
  }
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
  try {
    const result = await updatePost(postId, post);
    if (result) {
      window.location.href = `/post/?id=${postId}`;
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
}
