import { onCreatePost } from "../../ui/post/create.js";
import { authGuard } from "../../utilities/authGuard.js";

console.log("PostCreate view script loaded");

authGuard();

function setupFormListener() {
  const form = document.querySelector("#create-post");
  if (form) {
    console.log("Form found, adding submit listener");
    form.addEventListener("submit", (event) => {
      console.log("Form submit event triggered");
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
