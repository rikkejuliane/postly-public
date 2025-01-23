import { onCreatePost } from "../../ui/post/create.js";
import { authGuard } from "../../utilities/authGuard.js";
import { createLoadingSpinner } from "../../ui/global/loadingSpinner.js";

authGuard();

/**
 * Sets up an event listener for the "create post" form submission.
 */
function setupFormListener() {
  const form = document.querySelector("#create-post");
  if (form) {
    const spinnerContainer = document.createElement("div");
    spinnerContainer.className = "flex justify-center items-center";
    const spinner = createLoadingSpinner();
    spinnerContainer.appendChild(spinner);
    form.appendChild(spinnerContainer); //

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      spinner.classList.remove("hidden");
      const button = event.target.querySelector("button");
      button.disabled = true;

      try {
        await onCreatePost(event);
      } finally {
        spinner.classList.add("hidden");
        button.disabled = false;
      }
    });
  } else {
    console.error("Form not found");
  }
}

setupFormListener();
