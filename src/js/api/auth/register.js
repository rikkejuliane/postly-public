import { API_AUTH_REGISTER } from "../constants.js";

/**
 * Registers a new user with the provided details.
 *
 * @param {Object} data - The registration data.
 * @param {string} data.name - The user's name (required).
 * @param {string} data.email - The user's email address (required).
 * @param {string} data.password - The user's password (required).
 *
 * **OPTIONAL VALUES**
 *
 * @param {string} [data.bio] - A brief biography of the user (optional).
 * @param {Object} [data.avatar] - The user's avatar information (optional).
 * @param {string} [data.avatar.url] - URL for the user's avatar image.
 * @param {string} [data.avatar.alt] - Alt text for the user's avatar image.
 * @param {Object} [data.banner] - The user's banner information (optional).
 * @param {string} [data.banner.url] - URL for the user's banner image.
 * @param {string} [data.banner.alt] - Alt text for the user's banner image.
 * @param {boolean} [data.venueManager] - Indicates if the user is a venue manager (optional, used for holidaze).
 * @returns {Promise<Object>} A promise that resolves to the user's registration response.
 */
export async function register({
  name,
  email,
  password,
  bio,
  avatar,
  banner
}) {
  try {
    // Send a POST request to the registration URL
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
        banner
      }),
    });

    // Parse the JSON response
    const json = await response.json();
    console.log("Registration response:", json);

    // Handle non-OK responses with various error structures
    if (!response.ok) {
      let errorMessage = "Failed to register";

      // Check for common error formats
      if (json.errors && Array.isArray(json.errors) && json.errors[0]?.message) {
        errorMessage = json.errors[0].message; // Array of errors
      } else if (json.error && typeof json.error === "string") {
        errorMessage = json.error; // Single error message as a string
      } else if (json.message) {
        errorMessage = json.message; // Single message field
      } else {
        console.error("Unexpected error structure:", json); // Log unexpected structures
      }

      // Throw the extracted error message
      throw new Error(errorMessage);
    }

    // Return the JSON response if registration was successful
    return json;

  } catch (error) {
    // Log and re-throw the error to handle it in the calling function
    console.error("Error in register:", error);
    throw error;
  }
}