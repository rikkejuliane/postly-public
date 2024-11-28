import { renderPosts } from "../../api/post/renderPosts.js";
import { API_SOCIAL_POSTS } from "../../api/constants.js";
import { headers } from "../../api/headers.js";
import { loadPosts } from "./loadPosts.js";
import { readPosts } from "../../api/post/read.js";
/**
 * Initializes a search input field to dynamically search and display posts.
 *
 * - Listens for input events on the search field.
 * - Fetches posts that match the search query from the API.
 * - Clears the container and reloads default posts when the search query is empty.
 * - Displays search results or an appropriate message if no results are found.
 *
 * @param {HTMLInputElement} searchInput - The search input field element.
 * @param {HTMLElement} container - The container element to render search results into.
 * @param {HTMLElement} [dropdown] - An optional dropdown element for filtering tags.
 * @returns {void}
 */
export function initializeSearch(searchInput, container, dropdown) {
  let searchQuery = "";
  searchInput.addEventListener("input", async (event) => {
    searchQuery = event.target.value.trim();
    if (!searchQuery) {
      container.innerHTML = "";
      loadPosts(container, readPosts, dropdown);
      return;
    }
    try {
      const url = `${API_SOCIAL_POSTS}/search?q=${encodeURIComponent(
        searchQuery
      )}&_author=true`;
      const response = await fetch(url, {
        method: "GET",
        headers: headers(),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const result = await response.json();
      const posts = Array.isArray(result.data) ? result.data : [result.data];
      if (!posts.length) {
        container.innerHTML = "<p>No posts found matching your search.</p>";
        return;
      }
      container.innerHTML = "";
      renderPosts(container, posts);
    } catch (error) {
      console.error("Search Error:", error);
      container.innerHTML = `<p>Error loading search results: ${error.message}</p>`;
    }
  });
}
