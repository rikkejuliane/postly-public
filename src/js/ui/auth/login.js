/**
 * This function should pass data to the login function in api/auth and handle the response
 */

import { login } from "../../api/auth/login.js"; // Adjust path as needed

export async function onLogin(event) {
  event.preventDefault();

  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;
  const button = form.querySelector("button");

  try {
    button.disabled = true;
    button.textContent = "Logging in...";

    // Call the login function from the API
    const response = await login({ email, password });

    // On successful login, redirect to the homepage (index.html)
    alert("Login successful!");
    window.location.href = "/"; // Redirect to homepage
  } catch (error) {
    console.error("Login failed:", error);
    alert(error.message); // Display error message to the user
  } finally {
    button.disabled = false;
    button.textContent = "Login";
  }
}
