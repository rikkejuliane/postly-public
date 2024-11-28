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
 * Initialize comment buttons.
 */
export function initializeCommentButtons() {
  document.addEventListener("click", async (event) => {
    // Handle opening and closing the comment section
    if (event.target.classList.contains("comment-button")) {
      const postId = event.target.dataset.postId;
      const commentSection = document.getElementById(`comments-${postId}`);
      const isOpen = commentSection.style.display === "block";

      // Toggle the comment section visibility
      commentSection.style.display = isOpen ? "none" : "block";

      if (!isOpen && !commentSection.dataset.loaded) {
        // Load comments if not already loaded
        try {
          const comments = await fetchComments(postId);
          renderComments(commentSection, comments, postId);
          commentSection.dataset.loaded = true;
        } catch (error) {
          commentSection.innerHTML = `<p>Error loading comments.</p>`;
        }
      }
    }

    // Handle posting a comment
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

        // Create the new comment HTML
        const newCommentHTML = `
          <p id="comment-${newComment.id}">
            <strong>${newComment.owner}</strong>: ${newComment.body}
            <button class="delete-comment" data-post-id="${postId}" data-comment-id="${newComment.id}" data-owner="${newComment.owner}">x</button>
          </p>
        `;

        // Insert the new comment above the textarea
        const textAreaElement = document.getElementById(`new-comment-${postId}`);
        textAreaElement.insertAdjacentHTML("beforebegin", newCommentHTML);

        // Clear the textarea
        textArea.value = "";

        // Increment the comment count
        const commentButton = document.querySelector(
          `.comment-button[data-post-id="${postId}"]`
        );
        const currentCount = parseInt(commentButton.textContent.match(/\d+/)) || 0;
        commentButton.innerHTML = `💬 ${currentCount + 1}`;

        alert("Comment posted!");
      } catch (error) {
        alert("Failed to post comment. Please try again.");
      }
    }

    // Handle deleting a comment
    if (event.target.classList.contains("delete-comment")) {
      const postId = event.target.dataset.postId;
      const commentId = event.target.dataset.commentId;
      const owner = event.target.dataset.owner; // Get the owner from the button's dataset
      const loggedInUser = localStorage.getItem("username"); // Get the logged-in username

      // Only allow deletion if the logged-in user is the owner of the comment
      if (owner !== loggedInUser) {
        alert("You can only delete your own comments.");
        return;
      }

      if (confirm("Are you sure you want to delete this comment?")) {
        try {
          await deleteComment(postId, commentId);
          // Remove the comment from the DOM
          const commentElement = document.getElementById(`comment-${commentId}`);
          commentElement.remove();

          // Decrement the comment count
          const commentButton = document.querySelector(
            `.comment-button[data-post-id="${postId}"]`
          );
          const currentCount = parseInt(commentButton.textContent.match(/\d+/)) || 1;
          commentButton.innerHTML = `💬 ${currentCount - 1}`;
        } catch (error) {
          alert("Failed to delete comment. Please try again.");
        }
      }
    }
  });
}

/**
 * Render comments inside the comment section in chronological order.
 * 
 * @param {HTMLElement} commentSection - The container for the comments.
 * @param {Array} comments - The comments to render.
 * @param {number} postId - ID of the post for context.
 */
function renderComments(commentSection, comments, postId) {
  const sortedComments = comments.sort((a, b) => new Date(a.created) - new Date(b.created));

  const loggedInUser = localStorage.getItem("username");

  commentSection.innerHTML = `
    ${sortedComments
      .map(
        (comment) =>
          `<p id="comment-${comment.id}">
            <strong>${comment.owner}</strong>: ${comment.body}
            ${
              comment.owner === loggedInUser
                ? `<button class="delete-comment" data-post-id="${postId}" data-comment-id="${comment.id}" data-owner="${comment.owner}">x</button>`
                : ""
            }
          </p>`
      )
      .join("")}
    <textarea id="new-comment-${postId}" placeholder="Write a comment..." class="textarea-comment"></textarea>
    <button class="post-comment-button" data-post-id="${postId}">Post Comment</button>
  `;
}
