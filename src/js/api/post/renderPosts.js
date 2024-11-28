/**
 * Renders posts as HTML cards into a specified container.
 *
 * @param {HTMLElement} container - The container element to render the posts into.
 * @param {Array<Object>} posts - An array of post objects containing post details.
 * @returns {void}
 *
 * @description
 * - Converts post objects into structured HTML cards displaying:
 *   - Author information (avatar and name).
 *   - Post metadata (title, body, tags, reactions, and comments).
 *   - Media content if available.
 *   - Reaction and comment buttons with counts.
 * - Includes action buttons (Edit/Delete) for the post author.
 * - Appends the generated HTML to the specified container.
 */
export function renderPosts(container, posts) {
  const loggedInUser = localStorage.getItem("username");

  const postsHTML = posts
    .map((post) => {
      const postId = post.id;
      const authorAvatar =
        post.author?.avatar?.url || "/images/default-avatar.png";
      const authorName = post.author?.name || "Anonymous";
      const postDate = post.created
        ? new Date(post.created).toLocaleDateString()
        : "Unknown date";
      const tagsHTML =
        post.tags && post.tags.length
          ? `
              <div class="post-card-tags">
                  <span class="post-card-tags-label">Tags:</span>
                  <span class="post-card-tag-list">${post.tags.join(
                    ", "
                  )}</span>
              </div>
          `
          : "";

      const totalReactions =
        post.reactions?.reduce((sum, reaction) => sum + reaction.count, 0) || 0;
      const totalComments = post._count?.comments || 0;
      const userHasReacted = post.reactions?.some(
        (reaction) =>
          reaction.symbol === "❤️" && reaction.reactors?.includes(loggedInUser)
      );
      return `
              <div class="post-card-wrapper">
                  <div class="post-card">
                      <a href="/profile/?username=${authorName}" class="profile-link">
                          <div class="post-card-header">
                              <img src="${authorAvatar}" alt="${authorName}'s avatar" class="post-card-avatar">
                              <span class="post-card-username">${authorName}</span>
                          </div>
                      </a>
                      <a href="/post/?id=${postId}" class="post-card-link">
                          <div class="post-card-content">
                              <h3 class="post-card-title">${post.title}</h3>
                              ${
                                post.media?.url
                                  ? `
                                  <img src="${post.media.url}" alt="${
                                      post.media.alt || "Media"
                                    }" class="post-card-image"
                                    onerror="this.onerror=null;this.src='/images/default-avatar.png';" >
                              `
                                  : ""
                              }
                              <p class="post-card-body">${post.body || ""}</p>
                          </div>
                      </a>
                      <div class="post-card-footer">
                          ${tagsHTML}
                          <span class="post-card-date">${postDate}</span>
                          ${
                            loggedInUser === authorName
                              ? `
                               <div class="post-card-actions">
                                 <button onclick="window.location.href='/post/edit/?id=${post.id}'" class="post-card-edit">Edit</button>
                                  <button class="post-card-delete" data-id="${post.id}">Delete</button>
                              </div>
                          `
                              : ""
                          }
                          <div class="reaction-container">
                              <button
                                class="reaction-button ${
                                  userHasReacted ? "reacted" : ""
                                }"
                                data-post-id="${postId}"
                                data-symbol="❤️"
                              >
                                ❤️ ${totalReactions}
                              </button>
                              <button
                                class="comment-button"
                                data-post-id="${postId}"
                              >
                                💬 ${totalComments}
                              </button>
                          </div>
                          <!-- Comment Section Placeholder -->
                          <div class="comment-section" id="comments-${postId}" style="display: none;">
                              <!-- Comments will be dynamically loaded here -->
                          </div>
                      </div>
                  </div>
              </div>
          `;
    })
    .join("");

  container.insertAdjacentHTML("beforeend", postsHTML);
}
