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
  button.textContent = "↑";
  button.classList.add(
    "hidden",
    "fixed",
    "bottom-5",
    "right-5",
    "flex",
    "items-center",
    "justify-center",
    "p-2",
    "w-10",
    "h-10",
    "text-darkgreen",
    "text-2xl",
    "bg-white",
    "font-bold",
    "rounded-full",
    "shadow-md",
    "cursor-pointer",
    "z-50",
    "transition-opacity",
    "duration-300",
    "opacity-0"
  );
  document.body.appendChild(button);

  function toggleVisibilityAndPosition() {
    const mainElement = document.querySelector("main");
    const footerElement = document.querySelector("footer");
    if (!mainElement || !footerElement) {
      console.error("Main or footer element not found");
      return;
    }

    const footerTop = footerElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Show the button if scroll is past 1000px
    if (window.scrollY > 1000) {
      button.classList.remove("hidden", "opacity-0");
      button.classList.add("block", "opacity-100");

      // Stop the button above the footer if it's visible
      if (footerTop < windowHeight) {
        button.style.bottom = `${windowHeight - footerTop + 20}px`; // Adjust "20px" to control the gap above the footer
      } else {
        button.style.bottom = "20px"; // Default distance from the bottom of the viewport
      }
    } else {
      button.classList.remove("block", "opacity-100");
      button.classList.add("hidden", "opacity-0");
    }
  }

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", toggleVisibilityAndPosition);

  // Initial check for visibility and position
  toggleVisibilityAndPosition();
}
