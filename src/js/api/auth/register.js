import { API_AUTH_REGISTER } from "../constants.js";

/**
 * Registers a new user by sending a POST request to the registration API.
 *
 * @param {Object} data - The registration data.
 * @param {string} data.name - The user's name (required).
 * @param {string} data.email - The user's email address (required).
 * @param {string} data.password - The user's password (required).
 * @param {string} [data.bio] - A brief biography of the user (optional).
 * @param {Object} [data.avatar] - The user's avatar information (optional).
 * @param {string} [data.avatar.url] - URL of the user's avatar image.
 * @param {string} [data.avatar.alt] - Alt text for the user's avatar image.
 * @param {Object} [data.banner] - The user's banner information (optional).
 * @param {string} [data.banner.url] - URL of the user's banner image.
 * @param {string} [data.banner.alt] - Alt text for the user's banner image.
 *
 * @returns {Promise<Object>} Resolves with the registration response if successful.
 * @throws {Error} If the registration request fails or the server responds with an error.
 */

export async function register({ name, email, password, bio, avatar, banner }) {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        bio,
        avatar,
        banner,
      }),
    });

    const json = await response.json();
    if (!response.ok) {
      let errorMessage = "Failed to register";
      if (
        json.errors &&
        Array.isArray(json.errors) &&
        json.errors[0]?.message
      ) {
        errorMessage = json.errors[0].message;
      } else if (json.error && typeof json.error === "string") {
        errorMessage = json.error;
      } else if (json.message) {
        errorMessage = json.message;
      } else {
        console.error("Unexpected error structure:", json);
      }
      throw new Error(errorMessage);
    }
    return json;
  } catch (error) {
    console.error("Error in register:", error);
    throw error;
  }
}
