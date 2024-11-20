/**
 * Logs out the user by clearing relevant user data from the browser's localStorage.
 *
 * This function removes the user's token and username from localStorage, effectively 
 * logging them out. Optionally, it can redirect the user to the login page if desired.
 */

export function onLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}
