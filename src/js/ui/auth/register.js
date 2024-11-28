import { register } from "../../api/auth/register"; // Adjust import path as needed
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
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const button = form.querySelector("button");
  try {
    button.disabled = true;
    button.textContent = "Registering...";
    const response = await register({ name, email, password });
    alert("Registration successful!");
    window.location.href = "/auth/login/";
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please try again.");
  } finally {
    button.disabled = false;
    button.textContent = "Register";
  }
}
