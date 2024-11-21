import { onCreatePost } from "../../ui/post/create.js";
import { authGuard } from "../../utilities/authGuard.js";

authGuard();

function setupFormListener() {
  const form = document.querySelector("#create-post");
  if (form) {
    form.addEventListener("submit", (event) => {
      onCreatePost(event);
    });
  } else {
    console.error("Form not found");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupFormListener);
} else {
  setupFormListener();
}
