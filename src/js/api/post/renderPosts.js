/**
 * Renders a list of posts into a specified container.
 *
 * @param {HTMLElement} container - The container where the posts will be rendered.
 * @param {Array<Object>} posts - An array of post objects to render.
 *
 * @description
 * - Iterates through the list of posts and generates individual post HTML using helper functions.
 * - Inserts the rendered HTML into the container.
 */
export function renderPosts(container, posts) {
  const postsHTML = posts
    .map((post) => {
      const authorAvatar =
        post.author?.avatar?.url || "/images/default-avatar.png";
      const authorName = post.author?.name || "Anonymous";
      const postDate = post.created
        ? new Date(post.created).toLocaleDateString()
        : "Unknown date";

      const tagsHTML = post.tags && post.tags.length
        ? `<div class="post-card-tags">
             <span class="post-card-tags-label">Tags:</span>
             <span class="post-card-tag-list">${post.tags.join(", ")}</span>
           </div>`
        : "";

      return `
      <a href="/post/?id=${post.id}" class="post-card-link">
        <div class="post-card">
          <div class="post-card-header">
            <img src="${authorAvatar}" 
                 alt="${authorName}'s avatar" 
                 class="post-card-avatar">
            <span class="post-card-username">${authorName}</span>
          </div>
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
          <div class="post-card-footer">
            ${tagsHTML}
            <span class="post-card-date">${postDate}</span>
          </div>
        </div>
      </a>
      `;
    })
    .join("");

  container.insertAdjacentHTML("beforeend", postsHTML);
}


