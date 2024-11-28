import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Toggles a reaction (like or unlike) for a specific post.
 *
 * @param {string} postId - The ID of the post to react to.
 * @param {string} symbol - The reaction symbol (e.g., ❤️, 👍).
 * @returns {Promise<Array<Object>>} - An array of updated reactions, each including the symbol, count, and reactors.
 * @throws {Error} - If the API request fails or an error occurs during processing.
 */
export async function toggleReaction(postId, symbol) {
  const url = `${API_SOCIAL_POSTS}/${postId}/react/${(symbol)}`;
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
 * Initializes event listeners for reaction buttons on dynamically rendered posts.
 *
 * - Listens for clicks on elements with the "reaction-button" class.
 * - Toggles the reaction state using the `toggleReaction` function.
 * - Updates the button's appearance and reaction count to reflect the current state.
 *
 * @listens {Event} click - Listens for clicks on reaction buttons.
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
