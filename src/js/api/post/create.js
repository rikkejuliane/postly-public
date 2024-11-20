import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants.js";
/**
 * Sends a POST request to the API to create a new post.
 *
 * @param {Object} data - The post data to send.
 * @param {string} data.title - The title of the post (required).
 * @param {string} [data.body] - The body of the post (optional).
 * @param {Object} [data.media] - The media object containing the URL and alt text (optional).
 * @param {string} [data.media.url] - The URL of the media (optional).
 * @param {string} [data.media.alt] - The alt text for the media (optional).
 * @returns {Promise<Response>} The response from the API.
 * @throws {Error} If the API request fails.
 */

export async function createPost({ title, body, media }) {
  console.log("Token:", localStorage.getItem("token"));
  console.log("API Endpoint:", API_SOCIAL_POSTS);

  const options = {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ title, body, media }),
  };

  try {
    console.log("Request headers:", options.headers);
    const response = await fetch(API_SOCIAL_POSTS, options);

    console.log("Response status:", response.status);
    const data = await response.json();

    if (!response.ok) {
      console.error("Full error response:", data);
      throw new Error(data.message || "Failed to create post");
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Detailed API Error:", error);
    throw error;
  }
}
