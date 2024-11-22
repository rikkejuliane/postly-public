// alert("Single Post Page");

import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { renderPosts, readPost } from "../../api/post/read.js";

authGuard();
setLogoutListener();


const postContainer = document.querySelector("#post-container");

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

if (postId) {
  renderPosts(postContainer, async () => {
    const post = await readPost(postId);
    return { data: [post] };
  });
} else {
  postContainer.innerHTML = "<p>Post ID is missing in the URL.</p>";
}


