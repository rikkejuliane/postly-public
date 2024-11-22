/**
 * Initializes the tag filter dropdown for the homepage.
 *
 * @param {HTMLElement} dropdown - The dropdown element to listen for changes.
 * @param {Function} loadPosts - A function to call when the selected tag changes, with the selected tag as its argument.
 * @param {string} defaultTag - The default tag to load initially (e.g., "all").
 */
export function initializeTagFilter(dropdown, loadPosts, defaultTag = "all") {
  let currentTag = defaultTag;

  dropdown.addEventListener("change", (event) => {
    currentTag = event.target.value;
    loadPosts(currentTag);
  });

  loadPosts(currentTag);
}
