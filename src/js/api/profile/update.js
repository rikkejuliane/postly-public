import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";
/**
 * Updates a user's profile with new avatar, banner, or bio details.
 *
 * @param {string} username - The username of the profile to update.
 * @param {Object} data - An object containing the profile fields to update.
 * @param {Object} [data.avatar] - An object containing the URL of the new avatar image (optional).
 * @param {Object} [data.banner] - An object containing the URL of the new banner image (optional).
 * @param {string} [data.bio] - A new bio for the profile (optional).
 * @returns {Promise<Object>} The updated profile data from the API.
 * @throws {Error} If the API request fails or the server returns an error.
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
