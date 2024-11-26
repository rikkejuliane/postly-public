import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Updates the profile with new avatar, banner, or bio.
 *
 * @param {string} username - The username of the profile to update.
 * @param {Object} data - The data to update (e.g., avatar, banner, bio).
 * @param {Object} data.avatar - An object containing the `url` for the avatar image.
 * @param {Object} data.banner - An object containing the `url` for the banner image.
 * @param {string} data.bio - A new bio for the profile.
 * @returns {Promise<Object>} The updated profile data.
 * @throws {Error} If the API request fails.
 */
export async function updateProfile(username, { avatar, banner, bio }) {
  const url = `${API_SOCIAL_PROFILES}/${encodeURIComponent(username)}`;

  const payload = {};
  if (avatar) payload.avatar = avatar;
  if (banner) payload.banner = banner;
  if (bio) payload.bio = bio;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }

    const { data: updatedProfile } = await response.json();
    return updatedProfile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
