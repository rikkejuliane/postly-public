import { renderPosts } from "../../api/post/renderPosts.js";
/**
 * Loads posts and renders them into a specified container with optional tag filtering, search, and pagination.
 *
 * - Fetches posts using the provided `fetchFunction`.
 * - Renders posts into the `container` element.
 * - Supports pagination via a "Load More" button.
 * - Allows filtering by tags using an optional dropdown.
 * - Handles search queries if provided in the `options`.
 *
 * @async
 * @param {HTMLElement} container - The container element to render posts into.
 * @param {Function} fetchFunction - The function to fetch posts (e.g., `readPosts` or `readPostsByUser`).
 * @param {HTMLElement} [dropdown] - Optional dropdown element for tag filtering.
 * @param {Object} [options={}] - Additional options for fetching posts.
 * @param {number} [options.limit=12] - The maximum number of posts to fetch per request.
 * @param {number} [options.page=1] - The initial page number for pagination.
 * @param {string} [options.tag="all"] - The tag to filter posts by (default is "all").
 * @param {string} [options.username] - The username to fetch posts for (optional).
 * @param {string} [options.searchQuery] - A search query to filter posts by content (optional).
 * @throws {Error} If fetching posts fails.
 * @returns {Promise<void>} Resolves when the posts have been loaded and rendered.
 */
export async function loadPosts(container, fetchFunction, dropdown, options = {}) {
  let currentPage = options.page || 1;
  const limit = options.limit || 12;
  let currentTag = options.tag || "all";
  let searchQuery = options.searchQuery || null;

  async function fetchAndRender() {
    try {
      const tagToFetch = currentTag === "all" ? null : currentTag;
      const result = await fetchFunction(limit, currentPage, tagToFetch, options.username, searchQuery);
      const posts = Array.isArray(result.data) ? result.data : [result.data];
      if (!posts || posts.length === 0) {
        if (currentPage === 1) {
          container.innerHTML = "<p>No posts available yet.</p>";
        }
        return;
      }
      renderPosts(container, posts);
      currentPage++;
    } catch (error) {
      console.error("Error loading posts:", error);
      if (currentPage === 1) {
        container.innerHTML = `<p>Error loading posts: ${error.message}</p>`;
      }
    }
  }

  const loadMoreButton = document.querySelector(".load-more-btn") || document.createElement("button");
  loadMoreButton.textContent = "Load More";
  loadMoreButton.classList.add("load-more-btn");
  loadMoreButton.removeEventListener("click", fetchAndRender);
  loadMoreButton.addEventListener("click", fetchAndRender);
  if (!container.nextElementSibling?.classList.contains("load-more-btn")) {
    container.insertAdjacentElement("afterend", loadMoreButton);
  }
  if (dropdown) {
    dropdown.addEventListener("change", (event) => {
      currentTag = event.target.value;
      currentPage = 1;
      searchQuery = null;
      container.innerHTML = "";
      fetchAndRender();
    });
  }
  await fetchAndRender();
}
