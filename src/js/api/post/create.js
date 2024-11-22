import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants.js";

/**
 * Sends a POST request to the API to create a new post.
 *
 * @param {Object} data - The post data to send.
 * @param {string} data.title - The title of the post (required).
 * @param {string} [data.body] - The body of the post (optional).
 * @param {Object} [data.media] - The media object containing the URL and alt text (optional).
 * @param {Array<string>} [data.tags] - An array of tags for the post (optional).
 * @returns {Promise<Response>} The response from the API.
 * @throws {Error} If the API request fails.
 */
export async function createPost({ title, body, media, tags }) {
  const options = {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ title, body, media, tags }),
  };

  try {
    const response = await fetch(API_SOCIAL_POSTS, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create post");
    }

    return data;
  } catch (error) {
    console.error("Detailed API Error:", error);
    throw error;
  }
}
