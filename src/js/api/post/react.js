import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Toggles a reaction for a specific post.
 *
 * @param {string} postId - The ID of the post.
 * @param {string} symbol - The reaction symbol (e.g., ❤️).
 * @returns {Promise<Object>} - Updated reactions data.
 * @throws {Error} - If the request fails.
 */
export async function toggleReaction(postId, symbol) {
  const url = `${API_SOCIAL_POSTS}/${postId}/react/${encodeURIComponent(symbol)}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headers({ contentType: false }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to react to post: ${errorText}`);
    }

    const result = await response.json();
    return result.data.reactions;
  } catch (error) {
    throw new Error(`Error toggling reaction: ${error.message}`);
  }
}

/**
 * Initializes reaction buttons for dynamically rendered posts.
 *
 * - Updates the button state to reflect whether the user has liked the post.
 * - Uses the `toggleReaction` function to toggle reactions.
 */
export function initializeReactionButtons() {
  document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("reaction-button")) {
      const reactionButton = event.target;

      const postId = reactionButton.dataset.postId;
      const symbol = reactionButton.dataset.symbol || "❤️";

      if (!postId) {
        return;
      }
      reactionButton.disabled = true;

      try {
        const updatedReactions = await toggleReaction(postId, symbol);

        const userReaction = updatedReactions.find(
          (reaction) => reaction.symbol === symbol
        );

        const reactionCount = userReaction?.count || 0;
        const userHasReacted = userReaction?.reactors?.includes(
          localStorage.getItem("username")
        );

        reactionButton.textContent = `${symbol} ${reactionCount}`;
        reactionButton.classList.toggle("reacted", userHasReacted);
      } catch (error) {
        console.error("Error toggling reaction:", error);
        alert("Error toggling reaction. Please try again.");
      } finally {
        reactionButton.disabled = false;
      }
    }
  });
}
