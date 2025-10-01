import { register } from "../../api/auth/register";
import { createLoadingSpinner } from "../global/loadingSpinner.js";
import { openModal } from "../../ui/global/modalMessage.js";

/**
 * Handles the user registration process.
 *
 * - Prevents the default form submission behavior.
 * - Collects user input (name, email, password) from the registration form.
 * - Sends a registration request to the server using the `register` function.
 * - Displays success or failure messages to the user.
 * - Redirects to the login page on successful registration.
 *
 * @async
 * @param {Event} event - The event object triggered by the form submission.
 * @throws {Error} If the registration request fails or an unexpected error occurs.
 */
export async function onRegister(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value.trim();
  const button = form.querySelector("button");
  const spinnerContainer = document.getElementById("spinner-container");
  const spinner = createLoadingSpinner();

  try {
    button.disabled = true;
    spinnerContainer.appendChild(spinner);
    spinner.classList.remove("hidden");

    await register({ name, email, password });

    openModal({
      title: "Registration Successful",
      content: "Your account has been created successfully. Redirecting to login...",
      confirmText: "OK",
      onConfirm: () => {
        window.location.href = "/auth/login/";
      },
    });
  } catch (error) {
    console.error("Registration failed:", error);

    openModal({
      title: "Registration Failed",
      content: `There was an issue with your registration. Please try again. Error: ${error.message}`,
      confirmText: "OK",
    });
  } finally {
    spinner.remove();
    button.disabled = false;
  }
}
