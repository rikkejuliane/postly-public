// alert("Single Post Page");

import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { renderPosts, readPost } from "../../api/post/read.js";

// Ensure the user is authenticated
authGuard();

// Set up the logout button functionality
setLogoutListener();

// Select the container for rendering the single post
const postContainer = document.querySelector("#post-container");

// Retrieve the post ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

if (postId) {
  renderPosts(postContainer, async () => {
    const post = await readPost(postId); // Fetch the post
    console.log("Fetched Single Post:", post); // Debug log
    return { data: [post] }; // Wrap the single post in an array for compatibility with renderPosts
  });
} else {
  postContainer.innerHTML = "<p>Post ID is missing in the URL.</p>";
}


