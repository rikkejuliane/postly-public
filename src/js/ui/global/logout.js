import { onLogout } from "../auth/logout.js";

/**
 * Attaches a logout event listener to the logout button.
 *
 * This function selects the logout button from the DOM and attaches a click 
 * event listener to it. When the button is clicked, the `onLogout` function is 
 * called to clear user data, and the user is redirected to the login page.
 *
 * @async
 * @throws {Error} If the logout button is not found in the DOM.
 */

export async function setLogoutListener() {
  const logoutButton = document.querySelector("#logout-btn");
  logoutButton.addEventListener("click", () => {
    onLogout()
    window.location.href = "/auth/login/";
  });
}
