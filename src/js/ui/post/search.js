import { renderPosts } from "../../api/post/renderPosts.js";
import { API_SOCIAL_POSTS } from "../../api/constants.js";
import { headers } from "../../api/headers.js";

import { loadPosts } from "./loadPosts.js";
import { readPosts } from "../../api/post/read.js";

export function initializeSearch(searchInput, container, dropdown) {
  let searchQuery = "";

  searchInput.addEventListener("input", async (event) => {
    searchQuery = event.target.value.trim();

    if (!searchQuery) {
      // Clear the container and reload default posts
      container.innerHTML = ""; // Clear search results
      loadPosts(container, readPosts, dropdown); // Reload the feed
      return;
    }

    try {
      const url = `${API_SOCIAL_POSTS}/search?q=${encodeURIComponent(searchQuery)}&_author=true`;
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

      container.innerHTML = ""; // Clear existing results
      renderPosts(container, posts);
    } catch (error) {
      console.error("Search Error:", error);
      container.innerHTML = `<p>Error loading search results: ${error.message}</p>`;
    }
  });
}

