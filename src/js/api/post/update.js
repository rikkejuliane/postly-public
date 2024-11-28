import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";
/**
 * Updates an existing post with the specified data.
 *
 * @param {string|number} id - The ID of the post to update.
 * @param {Object} params - The data to update the post with.
 * @param {string} [params.title] - The updated title of the post (optional).
 * @param {string} [params.body] - The updated body content of the post (optional).
 * @param {Array<string>} [params.tags] - An array of updated tags for the post (optional).
 * @param {Object} [params.media] - The updated media details for the post (optional).
 * @param {string} [params.media.url] - The URL of the updated media (optional).
 * @param {string} [params.media.alt] - The alt text for the updated media (optional).
 * @returns {Promise<Object>} The updated post data from the API.
 * @throws {Error} If the API request fails or the server returns an error.
 */
export async function updatePost(id, { title, body, tags, media }) {
  const url = `${API_SOCIAL_POSTS}/${id}`;
  const options = {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({ title, body, tags, media }),
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to update post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}
