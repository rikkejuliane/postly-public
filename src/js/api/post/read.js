import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Reads a single post by its ID.
 *
 * @param {string|number} id - The ID of the post to read.
 * @returns {Promise<object>} The response data.
 * @throws {Error} If the API request fails.
 */
export async function readPost(id) {
  const url = `${API_SOCIAL_POSTS}/${id}?_author=true`;
  const options = {
    method: "GET",
    headers: headers(),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch the post");
    }
    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Error fetching the post:", error);
    throw error;
  }
}

/**
 * Reads multiple posts with optional pagination and tagging.
 *
 * @param {number} [limit=12] - The maximum number of posts to return.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string|null} [tag=null] - An optional tag to filter posts (null for no filter).
 * @returns {Promise<Object>} An object containing an array of posts in the `data` field and pagination metadata.
 * @throws {Error} If the API request fails.
 */
export async function readPosts(limit = 12, page = 1, tag = null) {
  const url = new URL(API_SOCIAL_POSTS);
  url.searchParams.append("limit", limit);
  url.searchParams.append("page", page);

  if (tag) {
    url.searchParams.append("_tag", tag);
  }

  url.searchParams.append("_author", "true");

  const options = {
    method: "GET",
    headers: headers(),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch posts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

/**
 * Reads multiple posts by a specific user with optional pagination and tagging.
 *
 * @param {string} username - The username of the user whose posts to read.
 * @param {number} [limit=12] - The maximum number of posts to return.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [tag] - An optional tag to filter posts.
 * @returns {Promise<object>} Object with data and meta fields.
 * @throws {Error} If the API request fails.
 */
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  const url = new URL(
    `https://v2.api.noroff.dev/social/profiles/${username}/posts`
  );
  url.searchParams.append("limit", limit);
  url.searchParams.append("page", page);
  if (tag) url.searchParams.append("tag", tag);
  url.searchParams.append("_author", "true");

  const options = {
    method: "GET",
    headers: headers(),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
}


