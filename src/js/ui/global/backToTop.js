export function initializeBackToTop() {
  const button = document.createElement("button");
  button.id = "back-to-top";
  button.textContent = "↑ Back to Top";
  button.classList.add("hidden"); // Start hidden

  // Append the button to the body
  document.body.appendChild(button);

  // Function to toggle button visibility based on scroll position
  function toggleVisibility() {
    if (window.scrollY > 1500) {
      button.classList.add("show"); // Show button after 1500px
    } else {
      button.classList.remove("show"); // Hide button before 1500px
    }
  }

  // Add scroll event listener to toggle visibility
  window.addEventListener("scroll", toggleVisibility);

  // Add click event to scroll back to top
  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Initial visibility check in case the page is already scrolled
  toggleVisibility();
}
