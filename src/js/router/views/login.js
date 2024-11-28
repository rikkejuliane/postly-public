import { onLogin } from "../../ui/auth/login.js";
/**
 * Handles the login form submission event.
 *
 * - Prevents the default form submission behavior.
 * - Disables the submit button temporarily to prevent multiple submissions.
 * - Calls the `onLogin` function to process the login request.
 * - Displays an error message if the login fails.
 *
 * @listens submit - Listens for the form's `submit` event.
 * @param {Event} event - The event object triggered by the form submission.
 */
const form = document.forms.login;
const loginErrorElement = document.createElement("div");
loginErrorElement.id = "login-error";
form.appendChild(loginErrorElement);
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = document.querySelector("button");
  submitButton.disabled = true;
  try {
    await onLogin(event);
  } catch (error) {
    console.error("Error in login:", error.message);
  } finally {
    submitButton.disabled = false;
  }
});

