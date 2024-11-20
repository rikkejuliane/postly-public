import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { renderPosts, readPostsByUser } from "../../api/post/read.js";

authGuard();
setLogoutListener();

const userPostsContainer = document.querySelector("#user-posts-container");
const username = "exampleUsername"; // Replace with dynamic username
renderPosts(userPostsContainer, readPostsByUser, { username });
