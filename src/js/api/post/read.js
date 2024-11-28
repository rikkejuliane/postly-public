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
  const url = `${API_SOCIAL_POSTS}/${id}?_author=true&_comments=true&_reactions=true`;
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
 * Fetches multiple posts with optional pagination and tag filtering.
 *
 * @param {number} [limit=12] - The maximum number of posts to fetch.
 * @param {number} [page=1] - The page number for paginated results.
 * @param {string|null} [tag=null] - A tag to filter posts by (optional).
 * @returns {Promise<Object>} An object containing the posts (`data`) and pagination metadata.
 * @throws {Error} If the API request fails or returns an error response.
 */
export async function readPosts(limit = 12, page = 1, tag = null) {
  const url = new URL(API_SOCIAL_POSTS);
  url.searchParams.append("limit", limit);
  url.searchParams.append("page", page);

  if (tag) {
    url.searchParams.append("_tag", tag);
  }
  url.searchParams.append("_author", "true");
  url.searchParams.append("_reactions", "true");
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
 * Fetches posts created by a specific user with optional pagination and tag filtering.
 *
 * @param {string} username - The username of the user whose posts to fetch.
 * @param {number} [limit=12] - The maximum number of posts to fetch.
 * @param {number} [page=1] - The page number for paginated results.
 * @param {string|null} [tag=null] - A tag to filter posts by (optional).
 * @returns {Promise<Object>} An object containing the posts (`data`) and pagination metadata.
 * @throws {Error} If the API request fails or returns an error response.
 */
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  const url = new URL(
    `https://v2.api.noroff.dev/social/profiles/${username}/posts`
  );
  url.searchParams.append("limit", limit);
  url.searchParams.append("page", page);
  if (tag) {
    url.searchParams.append("_tag", tag);
  }
  url.searchParams.append("_author", "true");
  url.searchParams.append("_reactions", "true");
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
