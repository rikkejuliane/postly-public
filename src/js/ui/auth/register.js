
/**
 * This function should pass data to the register function in api/auth and handle the response
 */

import { register } from "../../api/auth/register"; // Adjust import path as needed

export async function onRegister(event) {
  event.preventDefault();  // Prevent the default form submission

  // Get form data
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  const button = form.querySelector('button'); // Get the submit button

  try {
    // Disable the button to prevent multiple submissions
    button.disabled = true;
    button.textContent = "Registering...";

    // Call the registerUser function with the collected data
    const response = await register({ name, email, password });

    // Handle the response (you can display a success message or redirect to login, for example)
    console.log("User registered successfully:", response);
    alert("Registration successful! Please check your email to verify your account.");

    // Redirect to the login page after successful registration
    window.location.href = "/auth/login/";

  } catch (error) {
    // Handle errors (e.g., show a message to the user)
    console.error("Registration failed:", error);
    alert("Registration failed. Please try again.");

  } finally {
    // Enable the button again and reset its text
    button.disabled = false;
    button.textContent = "Register";
  }
}

