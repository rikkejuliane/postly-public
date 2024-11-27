import { API_AUTH_LOGIN } from "../constants.js";

/**
 * Logs in a user with the provided credentials.
 *
 * @param {Object} data - The login data.
 * @param {string} data.email - The user's email address (required).
 * @param {string} data.password - The user's password (required).
 * @returns {Promise<Object>} A promise that resolves to the user's login response.
 */

export async function login({ email, password }) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(
        json.message || "Login failed. Please check your credentials."
      );
    }

    return json;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
}
