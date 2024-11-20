import { login } from "../../api/auth/login.js"; // Adjust path as needed

/**
 * Handles the login process by passing user credentials to the login API 
 * and managing the response.
 *
 * This function extracts user input from the login form, sends the data to 
 * the `login` function, and processes the server's response. On success, 
 * it stores the user's token and username in localStorage and redirects to the home page.
 * On failure, it displays an error message to the user.
 *
 * @async
 * @param {Event} event - The event object triggered by the form submission.
 * @throws {Error} If the login request fails or the server returns an error.
 */

export async function onLogin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;
  try {
    const apiResponse = await login({ email, password });
    localStorage.setItem("token", apiResponse.data.accessToken);
    localStorage.setItem("username", apiResponse.data.name);
    window.location.href = "/";
  } catch (error) {
    alert(error.message);
  }
}