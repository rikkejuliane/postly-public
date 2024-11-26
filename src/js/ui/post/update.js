/**
 * Handles the submission of the edit post form.
 *
 * @param {Event} event - The submit event from the form.
 */

import { updatePost } from "../../api/post/update.js";

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
