import { openModal } from "../ui/global/modalMessage.js";

/**
 * Ensures that the user is authenticated.
 *
 * - If no token is found in localStorage, displays a modal informing the user
 *   they must be logged in and redirects them to the login page.
 *
 * @returns {void}
 */
export function authGuard() {
  if (!localStorage.token) {
    openModal({
      title: "Authentication Required",
      content: "You must be logged in to view this page.",
      confirmText: "Go to Login",
      onConfirm: () => {
        window.location.href = "/auth/login/";
      },
    });
  }
}
