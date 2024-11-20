import { register } from "../../api/auth/register"; // Adjust import path as needed

/**
 * Handles the user registration process.
 *
 * This function prevents the default form submission, collects user input from the form,
 * sends a registration request to the server, and handles the success or failure of the operation.
 *
 * @async
 * @param {Event} event - The event object triggered by the form submission.
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
