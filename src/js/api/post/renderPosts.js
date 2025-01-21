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
              <div class="font-montserrat text-xs font-bold pt-2">
                  <span>Tags:</span>
                  <span>${post.tags.join(
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
              <div class="max-w-[365px] sm:max-w-[480px]">
                  <div class="flex flex-col bg-white border-solid border-1 border-gray-400 rounded-lg shadow-md p-4 mb-4">
                      <a href="/profile/?username=${authorName}" class="profile-link">
                          <div class="flex items-center gap-5 pb-2">
                              <img src="${authorAvatar}" alt="${authorName}'s avatar" class="h-12 w-12 rounded-full object-cover">
                              <span class="font-montserrat font-semibold">${authorName}</span>
                          </div>
                      </a>
                      <a href="/post/?id=${postId}" class="post-card-link">
                          <div class="flex flex-col gap-1">
                              <h3 class="font-redHat font-bold text-xl break-words overflow-hidden">${post.title}</h3>
                              ${post.media?.url
          ? `
                                  <img src="${post.media.url}" alt="${post.media.alt || "Media"
          }" class="h-[355px] w-[355px] object-cover sm:h-[460px] sm:w-[460px]"
                                    onerror="this.onerror=null;this.src='/images/default-avatar.png';" >
                              `
          : ""
        }
                              <p class="font-montserrat text-sm break-words overflow-hidden">${post.body || ""}</p>
                          </div>
                      </a>
                      ${tagsHTML}
                          <span class="font-montserrat font-medium text-xs text-gray-600 pt-1">${postDate}</span>
                      <div class="flex flex-row-reverse  justify-between item-center pt-2">
                          
                          ${loggedInUser === authorName
          ? `
                               <div class="flex gap-2">
                                 <button onclick="window.location.href='/post/edit/?id=${post.id}'" class="font-redHat font-semibold text-base text-darkgreen cursor-pointer">Edit</button>
                                  <button class="post-card-delete font-redHat font-semibold text-base text-red-600 cursor-pointer" data-id="${post.id}">Delete</button>
                              </div>
                          `
          : ""
        }
                          <div class="flex gap-2 font-redHat font-black">
                              <button
                                class="reaction-button ${userHasReacted ? "reacted" : ""
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
