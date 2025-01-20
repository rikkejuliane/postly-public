import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Fetch comments for a post.
 *
 * @param {number} postId - ID of the post to fetch comments for.
 * @returns {Promise<Array>} - Array of comments.
 */
export async function fetchComments(postId) {
  const url = `${API_SOCIAL_POSTS}/${postId}?_comments=true`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch comments.");
    }

    const result = await response.json();
    return result.data.comments || [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

/**
 * Post a new comment.
 *
 * @param {number} postId - ID of the post to comment on.
 * @param {string} body - The comment text.
 * @returns {Promise<Object>} - The created comment data.
 */
export async function postComment(postId, body) {
  const url = `${API_SOCIAL_POSTS}/${postId}/comment`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ body }),
    });
    if (!response.ok) {
      throw new Error("Failed to post comment.");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
}

/**
 * Delete a comment.
 *
 * @param {number} postId - ID of the post the comment belongs to.
 * @param {number} commentId - ID of the comment to delete.
 * @returns {Promise<void>} - Resolves when the comment is deleted.
 */
export async function deleteComment(postId, commentId) {
  const url = `${API_SOCIAL_POSTS}/${postId}/comment/${commentId}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to delete comment.");
    }

    alert("Comment deleted!");
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}

/**
 * Initializes event listeners for comment-related actions:
 * - Toggling the visibility of the comment section.
 * - Fetching and rendering comments for a post.
 * - Posting new comments.
 * - Deleting existing comments (restricted to the logged-in user).
 */
export function initializeCommentButtons() {
  document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("comment-button")) {
      const postId = event.target.dataset.postId;
      const commentSection = document.getElementById(`comments-${postId}`);
      const isOpen = commentSection.style.display === "block";

      commentSection.style.display = isOpen ? "none" : "block";

      if (!isOpen && !commentSection.dataset.loaded) {
        try {
          const comments = await fetchComments(postId);
          renderComments(commentSection, comments, postId);
          commentSection.dataset.loaded = true;
        } catch (error) {
          commentSection.innerHTML = `<p>Error loading comments.</p>`;
        }
      }
    }
    if (event.target.classList.contains("post-comment-button")) {
      const postId = event.target.dataset.postId;
      const textArea = document.getElementById(`new-comment-${postId}`);
      const body = textArea.value.trim();

      if (!body) {
        alert("Comment cannot be empty.");
        return;
      }

      try {
        const newComment = await postComment(postId, body);
        const commentSection = document.getElementById(`comments-${postId}`);

        const newCommentHTML = `
          <p id="comment-${newComment.id}">
            <strong>${newComment.owner}</strong>: ${newComment.body}
            <button class="delete-comment" data-post-id="${postId}" data-comment-id="${newComment.id}" data-owner="${newComment.owner}">x</button>
          </p>
        `;

        const textAreaElement = document.getElementById(
          `new-comment-${postId}`
        );
        textAreaElement.insertAdjacentHTML("beforebegin", newCommentHTML);
        textArea.value = "";

        const commentButton = document.querySelector(
          `.comment-button[data-post-id="${postId}"]`
        );
        const currentCount =
          parseInt(commentButton.textContent.match(/\d+/)) || 0;
        commentButton.innerHTML = `💬 ${currentCount + 1}`;

        alert("Comment posted!");
      } catch (error) {
        alert("Failed to post comment. Please try again.");
      }
    }
    if (event.target.classList.contains("delete-comment")) {
      const postId = event.target.dataset.postId;
      const commentId = event.target.dataset.commentId;
      const owner = event.target.dataset.owner;
      const loggedInUser = localStorage.getItem("username");

      if (owner !== loggedInUser) {
        alert("You can only delete your own comments.");
        return;
      }

      if (confirm("Are you sure you want to delete this comment?")) {
        try {
          await deleteComment(postId, commentId);
          const commentElement = document.getElementById(
            `comment-${commentId}`
          );
          commentElement.remove();

          const commentButton = document.querySelector(
            `.comment-button[data-post-id="${postId}"]`
          );
          const currentCount =
            parseInt(commentButton.textContent.match(/\d+/)) || 1;
          commentButton.innerHTML = `💬 ${currentCount - 1}`;
        } catch (error) {
          alert("Failed to delete comment. Please try again.");
        }
      }
    }
  });
}

/**
 * Renders a list of comments inside the specified comment section.
 *
 * @param {HTMLElement} commentSection - The container element for the comments.
 * @param {Array<Object>} comments - Array of comment objects to render.
 * @param {number} postId - ID of the post to which the comments belong.
 * @property {string} comments[].owner - The username of the comment's author.
 * @property {string} comments[].body - The content of the comment.
 * @property {string} comments[].created - The creation timestamp of the comment.
 */
function renderComments(commentSection, comments, postId) {
  const sortedComments = comments.sort(
    (a, b) => new Date(a.created) - new Date(b.created)
  );

  const loggedInUser = localStorage.getItem("username");

  commentSection.innerHTML = `
  <div class="flex flex-col gap-1 max-w-80">
    ${sortedComments
      .map(
        (comment) =>
          `
        <div id="comment-${comment.id}" class="flex gap-1"> 
          <p>
            <strong>${comment.owner}</strong>: ${comment.body}
          </p>
          ${comment.owner === loggedInUser
            ? `<button class="delete-comment font-bold text-red-600 hover:text-red-800 cursor-pointer" 
                     data-post-id="${postId}" 
                     data-comment-id="${comment.id}" 
                     data-owner="${comment.owner}">x</button>`
            : ""
          }
        </div>`
      )
      .join("")}
    <div class="flex flex-col gap-1">
      <textarea id="new-comment-${postId}" placeholder="Write a comment..." 
        class="textarea-comment w-full border border-gray-300 rounded-lg p-2"></textarea>
      <button class="post-comment-button text-darkgreen font-bold py-2 px-4 rounded-lg shadow-md cursor-pointer hover:bg-creamwhite" 
        data-post-id="${postId}">
        Post Comment
      </button>
    </div>
  </div>
`;
}

