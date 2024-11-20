import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { renderPosts, readPosts } from "../../api/post/read.js";

authGuard();
setLogoutListener();

const feedContainer = document.querySelector("#feed-container");
renderPosts(feedContainer, readPosts);
