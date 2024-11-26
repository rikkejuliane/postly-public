import { API_SOCIAL_PROFILES } from "../../api/constants.js";
import { headers } from "../../api/headers.js"; // Import the headers function

/**
 * Handles the Follow/Unfollow action for a user.
 *
 * @param {string} username - The username of the profile being followed/unfollowed.
 * @param {boolean} isFollowing - Whether the current user is already following the profile.
 */
async function handleFollowAction(username, isFollowing) {
  const url = `${API_SOCIAL_PROFILES}/${username}/${isFollowing ? "unfollow" : "follow"}`;

  const options = {
    method: "PUT",
    headers: headers(), // Use the imported headers function
  };

  console.log("Request URL:", url);
  console.log("Request Options:", options);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from API:", errorData);
      throw new Error(errorData.errors?.[0]?.message || `Failed to ${isFollowing ? "unfollow" : "follow"} the user.`);
    }

    const result = await response.json();
    alert(`Successfully ${isFollowing ? "unfollowed" : "followed"} ${username}!`); // Success alert
    return result;
  } catch (error) {
    console.error("Error during follow/unfollow:", error);
    alert(`Could not ${isFollowing ? "unfollow" : "follow"} ${username}. Please try again.`);
  }
}

/**
 * Initializes the Follow/Unfollow button on the profile page.
 *
 * @param {string} username - The username of the profile being viewed.
 * @param {boolean} isFollowing - Whether the current user is already following the profile.
 */
export function initializeFollowToggle(username, isFollowing) {
  const followButton = document.getElementById("follow-button");
  if (!followButton) return;

  // Set the initial button text
  followButton.textContent = isFollowing ? "Unfollow" : "Follow";

  // Add click event listener for follow/unfollow action
  followButton.addEventListener("click", async () => {
    try {
      await handleFollowAction(username, isFollowing);

      // Toggle follow state
      isFollowing = !isFollowing;
      followButton.textContent = isFollowing ? "Unfollow" : "Follow";
    } catch (error) {
      console.error("Error toggling follow state:", error);
    }
  });
}
