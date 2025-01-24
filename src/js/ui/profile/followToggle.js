import { API_SOCIAL_PROFILES } from "../../api/constants.js";
import { headers } from "../../api/headers.js"; // Import the headers function
/**
 * Handles the Follow/Unfollow action for a user.
 *
 * - Sends a PUT request to the server to follow or unfollow a user based on the current state.
 * - Displays a success message if the action is successful, or an error message if it fails.
 *
 * @async
 * @param {string} username - The username of the profile being followed/unfollowed.
 * @param {boolean} isFollowing - Whether the current user is already following the profile.
 * @returns {Promise<Object>} The result of the follow/unfollow action from the API.
 * @throws {Error} If the API request fails or returns an error.
 */
async function handleFollowAction(username, isFollowing) {
  const url = `${API_SOCIAL_PROFILES}/${username}/${isFollowing ? "unfollow" : "follow"
    }`;
  const options = {
    method: "PUT",
    headers: headers(),
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from API:", errorData);
      throw new Error(
        errorData.errors?.[0]?.message ||
        `Failed to ${isFollowing ? "unfollow" : "follow"} the user.`
      );
    }
    const result = await response.json();
    alert(
      `Successfully ${isFollowing ? "unfollowed" : "followed"} ${username}!`
    );
    return result;
  } catch (error) {
    console.error("Error during follow/unfollow:", error);
    alert(
      `Could not ${isFollowing ? "unfollow" : "follow"
      } ${username}. Please try again.`
    );
  }
}

/**
 * Initializes the Follow/Unfollow button on the profile page.
 *
 * - Sets the initial button text based on whether the current user is following the profile.
 * - Adds an event listener to handle the follow/unfollow action when clicked.
 *
 * @param {string} username - The username of the profile being viewed.
 * @param {boolean} isFollowing - Whether the current user is already following the profile.
 * @returns {void}
 */
export function initializeFollowToggle(username, isFollowing) {
  const followButton = document.getElementById("follow-button");
  if (!followButton) return;
  followButton.textContent = isFollowing ? "Unfollow" : "Follow";
  followButton.addEventListener("click", async () => {
    try {
      await handleFollowAction(username, isFollowing);
      isFollowing = !isFollowing;
      followButton.textContent = isFollowing ? "Unfollow" : "Follow";
    } catch (error) {
      console.error("Error toggling follow state:", error);
    }
  });
}
