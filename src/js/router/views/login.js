import { onLogin } from "../../ui/auth/login";

/**
 * Handles the login form submission.
 *
 * Prevents the default form submission, disables the submit button to avoid multiple submissions, 
 * and calls the `onLogin` function to process the login. On success, redirects the user to the home page.
 * Displays an error message if the login fails.
 *
 * @listens submit - Listens for the form's `submit` event.
 * @param {Event} event - The event object triggered by the form submission.
 */

const form = document.forms.login;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  document.querySelector('button').disabled = true;
  try {
    await onLogin(event);
    window.location.href = "/";
  } catch (error) {
    console.error("Error in login:", error);
    alert(error.message);
  }
  finally {
    document.querySelector('button').disabled = false;
  }
});
