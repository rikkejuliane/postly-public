import { createPost } from "../../api/post/create.js";
/**
 * Handles the creation of a new post.
 *
 * - Prevents the default form submission behavior.
 * - Extracts and validates user input from the form fields.
 * - Constructs the post data object, including optional media and tags.
 * - Sends the data to the `createPost` API function.
 * - Displays success or error messages to the user.
 * - Redirects to the homepage on successful post creation.
 *
 * @async
 * @param {Event} event - The form submission event.
 * @throws {Error} If the API request fails or the response format is invalid.
 * @returns {void}
 */
export async function onCreatePost(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const title = formData.get("title").trim();
  const body = formData.get("body").trim();
  const mediaUrl = formData.get("media").trim();
  const mediaAlt = formData.get("alt").trim();
  const tags = formData
    .get("tags")
    .trim()
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  if (!title || !body) {
    alert("Title and body are required fields.");
    return;
  }
  const postData = {
    title,
    body,
    media: mediaUrl ? { url: mediaUrl, alt: mediaAlt } : undefined,
    tags,
  };
  try {
    const response = await createPost(postData);
    if (response && response.data.id) {
      alert("Post created successfully!");
      form.reset();
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error creating post:", error);
    alert(`Error creating post: ${error.message}`);
  }
}
