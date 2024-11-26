import { API_SOCIAL_PROFILES } from "../constants.js"; // Assuming constants.js defines API base paths
import { headers } from "../headers.js"; // Assumes headers.js manages authorization

/**
 * Fetches profile data for a specific username.
 *
 * @param {string} username - The username of the profile to fetch.
 * @returns {Promise<Object>} The profile data.
 * @throws {Error} If the API request fails.
 */
export async function fetchProfile(username) {
  const url = `${API_SOCIAL_PROFILES}/${encodeURIComponent(username)}`;

  try {
    const response = await fetch(url, { headers: headers() });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
