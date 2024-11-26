/**
 * Renders posts as HTML cards into a specified container.
 *
 * @param {HTMLElement} container - The container element to render the posts into.
 * @param {Array<Object>} posts - An array of post objects, each containing details like title, body, tags, media, and author information.
 *
 * @returns {void}
 *
 * @description
 * - Converts each post object into a structured HTML card.
 * - Displays post metadata, including:
 *   - Author (avatar and name).
 *   - Title and body content.
 *   - Media (if available).
 *   - Tags, displayed as a comma-separated list prefixed by "Tags:".
 *   - Post creation date.
 * - Inserts the generated HTML cards into the specified container.
 */

export function renderPosts(container, posts) {
  const loggedInUser = localStorage.getItem("username");
  const postsHTML = posts
    .map((post) => {
      const authorAvatar =
        post.author?.avatar?.url || "/images/default-avatar.png";
      const authorName = post.author?.name || "Anonymous";
      const postDate = post.created
        ? new Date(post.created).toLocaleDateString()
        : "Unknown date";

      const tagsHTML =
        post.tags && post.tags.length
          ? `<div class="post-card-tags">
             <span class="post-card-tags-label">Tags:</span>
             <span class="post-card-tag-list">${post.tags.join(", ")}</span>
           </div>`
          : "";

      return `
      <div class="post-card-wrapper">
        <div class="post-card">
          <!-- Profile Link Wrapping Avatar and Username -->
          <a href="/profile/?username=${authorName}" class="profile-link">
            <div class="post-card-header">
              <img src="${authorAvatar}" 
                   alt="${authorName}'s avatar" 
                   class="post-card-avatar">
              <span class="post-card-username">${authorName}</span>
            </div>
          </a>

          <!-- Single Post Link Wrapping Only Post Content -->
          <a href="/post/?id=${post.id}" class="post-card-link">
            <div class="post-card-content">
              <h3 class="post-card-title">${post.title}</h3>
              ${
                post.media?.url
                  ? `<img src="${post.media.url}" alt="${
                      post.media.alt || "Media"
                    }" class="post-card-image">`
                  : ""
              }
              <p class="post-card-body">${post.body || ""}</p>
            </div>
          </a>

          <div class="post-card-footer">
            ${tagsHTML}
            <span class="post-card-date">${postDate}</span>
          </div>
          ${
            loggedInUser === authorName
              ? `<button class="post-card-delete" data-id="${post.id}">Delete</button>`
              : ""
          }
        </div>
      </div>
      `;
    })
    .join("");

  container.insertAdjacentHTML("beforeend", postsHTML);
}
