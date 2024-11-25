import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { loadPosts } from "../../ui/post/loadPosts.js";
import { readPosts } from "../../api/post/read.js";
import { initializeSearch } from "../../ui/post/search.js";
import { initializeBackToTop } from "../../ui/global/backToTop.js";
import { onDeletePost } from "../../ui/post/delete.js"; // Import the delete handler

authGuard();
setLogoutListener();

const feedContainer = document.querySelector("#feed-container");
const tagFilter = document.querySelector("#tag-filter");
const searchInput = document.querySelector("#search-input");

loadPosts(feedContainer, readPosts, tagFilter);
initializeSearch(searchInput, feedContainer, tagFilter);
initializeBackToTop();

feedContainer.addEventListener("click", onDeletePost);

