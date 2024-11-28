import { onCreatePost } from "../../ui/post/create.js";
import { authGuard } from "../../utilities/authGuard.js";

authGuard();

/**
 * Sets up an event listener for the "create post" form submission.
 */
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

setupFormListener();
