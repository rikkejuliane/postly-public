import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Fetches the profile details for a specific user, including their followers and following.
 *
 * @param {string} username - The username of the profile to fetch.
 * @returns {Promise<Object>} - An object containing profile details, followers, and following.
 * @throws {Error} If the API request fails.
 */
export async function fetchProfile(username) {
  const url = `${API_SOCIAL_PROFILES}/${username}?_followers=true&_following=true`;
  const options = {
    method: "GET",
    headers: headers(),
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch profile.");
    }
    return (await response.json()).data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

/**
 * Fetches the list of followers for a given username.
 *
 * @param {string} username - The username of the profile whose followers to fetch.
 * @returns {Promise<Array<Object>>} - An array of follower profiles or an empty array if none exist.
 * @throws {Error} If the API request fails.
 */
export async function fetchFollowers(username) {
  const url = `${API_SOCIAL_PROFILES}/${username}?_followers=true`;
  const options = { method: "GET", headers: headers() };
  const response = await fetch(url, options);
  if (!response.ok) throw new Error("Failed to fetch followers.");
  return (await response.json()).data.followers || [];
}

/**
 * Fetches the list of profiles followed by a given username.
 *
 * @param {string} username - The username of the profile whose following list to fetch.
 * @returns {Promise<Array<Object>>} - An array of profiles being followed or an empty array if none exist.
 * @throws {Error} If the API request fails.
 */
export async function fetchFollowing(username) {
  const url = `${API_SOCIAL_PROFILES}/${username}?_following=true`;
  const options = { method: "GET", headers: headers() };
  const response = await fetch(url, options);
  if (!response.ok) throw new Error("Failed to fetch following.");
  return (await response.json()).data.following || [];
}