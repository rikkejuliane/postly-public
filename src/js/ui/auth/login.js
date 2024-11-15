/**
 * This function should pass data to the login function in api/auth and handle the response
 */
import { login } from "../../api/auth/login.js"; // Adjust path as needed

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