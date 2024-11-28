/**
 * Initializes a "Back to Top" button on the page.
 *
 * - Creates a button that scrolls the page to the top when clicked.
 * - Dynamically shows or hides the button based on the user's scroll position.
 * - Adds smooth scrolling behavior when the button is clicked.
 * - Automatically checks visibility on page load in case of initial scroll position.
 *
 * @returns {void}
 */
export function initializeBackToTop() {
  const button = document.createElement("button");
  button.id = "back-to-top";
  button.textContent = "↑ Back to Top";
  button.classList.add("hidden");
  document.body.appendChild(button);

  function toggleVisibility() {
    if (window.scrollY > 1500) {
      button.classList.add("show");
    } else {
      button.classList.remove("show");
    }
  }
  window.addEventListener("scroll", toggleVisibility);
  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  toggleVisibility();
}
