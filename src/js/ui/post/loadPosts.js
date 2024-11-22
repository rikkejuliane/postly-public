import { renderPosts } from "../../api/post/renderPosts.js";

/**
 * Handles loading posts and rendering them into a container with optional tag filtering and pagination.
 *
 * @param {HTMLElement} container - The container to render posts into.
 * @param {function} fetchFunction - The function to fetch posts (e.g., `readPosts` or `readPostsByUser`).
 * @param {HTMLElement} [dropdown] - Optional dropdown element for tag filtering.
 * @param {Object} options - Additional options for fetching posts (e.g., `limit`, `page`, `tag`, `username`).
 */
export async function loadPosts(container, fetchFunction, dropdown, options = {}) {
  let currentPage = options.page || 1;
  const limit = options.limit || 12;
  let currentTag = options.tag || "all";

  async function fetchAndRender() {
    try {
      const tagToFetch = currentTag === "all" ? null : currentTag;
      const result = await fetchFunction(limit, currentPage, tagToFetch, options.username);
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

  const loadMoreButton = document.createElement("button");
  loadMoreButton.textContent = "Load More";
  loadMoreButton.classList.add("load-more-btn");
  loadMoreButton.addEventListener("click", fetchAndRender);

  if (!container.querySelector(".load-more-btn")) {
    container.insertAdjacentElement("afterend", loadMoreButton);
  }

  if (dropdown) {
    dropdown.addEventListener("change", (event) => {
      currentTag = event.target.value;
      currentPage = 1;
      container.innerHTML = "";
      fetchAndRender();
    });
  }

  await fetchAndRender();
}
