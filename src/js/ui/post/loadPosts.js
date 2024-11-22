import { renderPosts } from "../../api/post/renderPosts.js";

/**
 * Handles loading posts and rendering them into a container with a "Load More" button.
 *
 * @param {HTMLElement} container - The container to render posts into.
 * @param {function} fetchFunction - The function to fetch posts (e.g., `readPosts` or `readPostsByUser`).
 * @param {Object} options - Additional options for fetching posts (e.g., `limit`, `page`, `tag`, `username`).
 */
export async function loadPosts(container, fetchFunction, options = {}) {
  let currentPage = options.page || 1; // Start page
  const limit = options.limit || 12; // Number of posts per page

  async function fetchAndRender() {
    try {
      const result = await fetchFunction(limit, currentPage, options.tag, options.username);
      const posts = Array.isArray(result.data) ? result.data : [result.data];

      if (!posts || posts.length === 0) {
        if (currentPage === 1) {
          container.innerHTML = "<p>No posts available yet.</p>";
        }
        return;
      }

      // Render posts using the modular `renderPosts`
      renderPosts(container, posts);

      // Increment the page for the next load
      currentPage++;
    } catch (error) {
      console.error("Error loading posts:", error);
      if (currentPage === 1) {
        container.innerHTML = `<p>Error loading posts: ${error.message}</p>`;
      }
    }
  }

  // Add the "Load More" button
  const loadMoreButton = document.createElement("button");
  loadMoreButton.textContent = "Load More";
  loadMoreButton.classList.add("load-more-btn");
  loadMoreButton.addEventListener("click", fetchAndRender);

  // Ensure the button is only added once
  if (!container.querySelector(".load-more-btn")) {
    container.insertAdjacentElement("afterend", loadMoreButton);
  }

  // Initial load
  await fetchAndRender();
}
