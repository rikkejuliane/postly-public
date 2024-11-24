import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { loadPosts } from "../../ui/post/loadPosts.js";
import { readPosts } from "../../api/post/read.js";
import { onDeletePost } from "../../ui/post/delete.js"; // Import the delete handler

authGuard();
setLogoutListener();

const feedContainer = document.querySelector("#feed-container");
const tagFilter = document.querySelector("#tag-filter");

loadPosts(feedContainer, readPosts, tagFilter);

feedContainer.addEventListener("click", onDeletePost);
