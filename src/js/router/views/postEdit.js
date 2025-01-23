import { authGuard } from "../../utilities/authGuard";
import { readPost } from "../../api/post/read.js";
import { onUpdatePost } from "../../ui/post/update.js";
import { createLoadingSpinner } from "../../ui/global/loadingSpinner.js";

/**
 * Initializes the post editing view.
 *
 * - Ensures the user is authenticated via `authGuard`.
 * - Fetches the post details using the post ID from the URL.
 * - Populates the form fields with the post's data (title, body, media, tags).
 * - Attaches the `onUpdatePost` event handler to handle form submission.
 *
 * @async
 * @function postEditView
 * @throws {Error} If the post cannot be fetched or another error occurs during initialization.
 */

export default async function postEditView() {
  authGuard();
  const postId = new URLSearchParams(window.location.search).get("id");
  const form = document.querySelector("#edit-post");

  if (!form || !postId) return;

  const spinnerContainer = document.createElement("div");
  spinnerContainer.className = "flex justify-center items-center";
  const spinner = createLoadingSpinner();
  spinnerContainer.appendChild(spinner);
  form.appendChild(spinnerContainer);

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

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      spinner.classList.remove("hidden");
      const button = event.target.querySelector("button");
      button.disabled = true;

      try {
        await onUpdatePost(event);
      } finally {
        spinner.classList.add("hidden");
        button.disabled = false;
      }
    });
  } catch (error) {
    console.error("Error loading post:", error);
  }
}

postEditView();
