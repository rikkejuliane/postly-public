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
  const url = `${API_SOCIAL_POSTS}/${id}?_author=true`; // Include author information
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
    console.log("ReadPost API Response:", result); // Log the full API response
    return result.data; // Return the `data` field directly
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
 * @param {string} [tag] - An optional tag to filter posts.
 * @returns {Promise<Object>} An object containing an array of posts in the `data` field, and information in a `meta` field.
 * @throws {Error} If the API request fails.
 */
export async function readPosts(limit = 12, page = 1, tag) {
  const url = new URL(API_SOCIAL_POSTS);
  url.searchParams.append("limit", limit);
  url.searchParams.append("page", page);
  if (tag) url.searchParams.append("tag", tag);
  url.searchParams.append("_author", "true"); // Include author information

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
  // Corrected URL for fetching posts by user
  const url = new URL(`https://v2.api.noroff.dev/social/profiles/${username}/posts`);
  url.searchParams.append("limit", limit);
  url.searchParams.append("page", page);
  if (tag) url.searchParams.append("tag", tag);
  url.searchParams.append("_author", "true"); // Include author information

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

/**
 * Render a list of posts into a given container.
 *
 * @param {HTMLElement} container - The container to render posts into.
 * @param {function} fetchFunction - The function to fetch posts (e.g., `readPosts` or `readPostsByUser`).
 * @param {Object} options - Additional options for fetching posts (e.g., `limit`, `page`, `username`, `tag`).
 * @returns {Promise<void>} Resolves when posts are rendered.
 */
export async function renderPosts(container, fetchFunction, options = {}) {
  container.innerHTML = "<p>Loading posts...</p>";

  try {
    const result = await fetchFunction(
      options.limit || 12,
      options.page || 1,
      options.tag,
      options.username
    );
    const posts = Array.isArray(result.data) ? result.data : [result.data]; // Ensure posts is always an array

    if (!posts || posts.length === 0) {
      container.innerHTML = "<p>No posts available yet.</p>";
      return;
    }

    const postsHTML = posts.map((post) => {
      const authorAvatar =
        post.author?.avatar?.url || "/images/default-avatar.png"; // Fix for profile images
      const authorName = post.author?.name || "Anonymous"; // Fetch username correctly
      const postDate = post.created ? new Date(post.created).toLocaleDateString() : "Unknown date";

      return `
        <a href="/post/?id=${post.id}" class="post-card-link">
          <div class="post-card">
            <div class="post-card-header">
              <img src="${authorAvatar}" 
                   alt="${authorName}'s avatar" 
                   class="post-card-avatar">
              <span class="post-card-username">${authorName}</span>
            </div>
            <div class="post-card-content">
            <h3 class="post-card-title">${post.title}</h3>
            ${
              post.media?.url
                ? `<img src="${post.media.url}" alt="${post.media.alt || 'Media'}" class="post-card-image">`
                : ""
            }
            <p class="post-card-body">${post.body || ""}</p>
            <div class="post-card-footer">
              <span class="post-card-date">${postDate}</span>
            </div>
            </div>
          </div>
        </a>
      `;
    }).join("");

    container.innerHTML = postsHTML;
  } catch (error) {
    console.error("Error loading posts:", error);
    container.innerHTML = `<p>Error loading posts: ${error.message}</p>`;
  }
}
