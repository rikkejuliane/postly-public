import { onLogout } from "../auth/logout.js";

/**
 * Functions you attach to logout events that calls ui/auth/logout function
 */
export async function setLogoutListener() {
  const logoutButton = document.getElementById("logout-btn");
  logoutButton.addEventListener("click", () => onLogout());
}
