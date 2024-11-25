export function initializeBackToTop() {
  const button = document.createElement("button");
  button.id = "back-to-top";
  button.textContent = "↑ Back to Top";
  button.style.display = "none"; // Initially hidden

  // Append the button to the body
  document.body.appendChild(button);

  // Function to toggle button visibility based on scroll position
  function toggleVisibility() {
    if (window.scrollY > 300) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
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

  // Public method to manually check visibility (useful during search)
  toggleVisibility(); // Ensure visibility is checked on load
}
