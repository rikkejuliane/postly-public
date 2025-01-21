import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { loadPosts } from "../../ui/post/loadPosts.js";
import { readPosts } from "../../api/post/read.js";
import { initializeSearch } from "../../ui/post/search.js";
import { initializeBackToTop } from "../../ui/global/backToTop.js";
import { onDeletePost } from "../../ui/post/delete.js";
import { initializeReactionButtons } from "../../api/post/react.js";
import { initializeCommentButtons } from "../../api/post/comment.js";
import { createLoadingSpinner } from "../../ui/global/loadingSpinner.js";

authGuard();
setLogoutListener();

const feedContainer = document.querySelector("#feed-container");
const tagFilter = document.querySelector("#tag-filter");
const searchInput = document.querySelector("#search-input");


const spinner = createLoadingSpinner();
feedContainer.appendChild(spinner);
spinner.classList.remove("hidden");

loadPosts(feedContainer, readPosts, tagFilter).then(() => {
  spinner.classList.add("hidden");
  initializeReactionButtons();
  initializeCommentButtons();
});

initializeSearch(searchInput, feedContainer, tagFilter);
initializeBackToTop();

feedContainer.addEventListener("click", onDeletePost);
