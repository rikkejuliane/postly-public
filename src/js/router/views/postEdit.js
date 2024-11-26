import { authGuard } from "../../utilities/authGuard";
import { readPost } from "../../api/post/read.js";
import { onUpdatePost } from "../../ui/post/update.js";

export default async function postEditView() {
  authGuard();

  const postId = new URLSearchParams(window.location.search).get("id");
  const form = document.querySelector("#edit-post");

  if (!form || !postId) return;

  try {
    const post = await readPost(postId);

    document.querySelector("#title").value = post.title;
    document.querySelector("#post-body").value = post.body;

    if (post.media) {
      document.querySelector("#image").value = post.media.url || "";
      document.querySelector("#image-alt").value = post.media.alt || "";
    }

    if (post.tags) {
      document.querySelector("#tags").value = post.tags.join(", ");
    }

    form.addEventListener("submit", onUpdatePost);
  } catch (error) {
    console.error("Error loading post:", error);
  }
}

postEditView();
