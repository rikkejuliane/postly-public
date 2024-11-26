/**
 * Updates an existing post with the specified data.
 *
 * @param {string|number} id - The ID of the post to update.
 * @param {Object} params - The data to update the post with.
 * @param {string} [params.title] - The new title.
 * @param {string} [params.body] - The new body.
 * @param {Array<string>} [params.tags] - The updated tags.
 * @param {Object} [params.media] - The updated media details.
 * @param {string} [params.media.url] - The new media URL.
 * @param {string} [params.media.alt] - The new media alt text.
 * @returns {Promise<Object>} The updated post data from the API.
 */
import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

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
