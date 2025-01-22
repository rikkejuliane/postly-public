import {
  fetchFollowers,
  fetchFollowing,
} from "../../api/profile/readProfile.js";
/**
 * Initializes the functionality for the followers and following modal.
 *
 * - Displays follower and following counts on the profile page.
 * - Opens a modal to display a list of followers or following when clicked.
 * - Fetches the followers or following list from the API and populates the modal.
 * - Allows the user to close the modal either by clicking the close button or clicking outside the modal.
 *
 * @param {string} username - The username for the profile whose followers and following lists will be fetched.
 * @param {Object} profileData - The profile data containing the counts of followers and following.
 * @throws {Error} If any required DOM elements are missing or an error occurs during fetching.
 * @returns {void}
 */
export function initializeProfileFollowersModal(username, profileData) {
  const followersCountButton = document.getElementById("followers-count");
  const followingCountButton = document.getElementById("following-count");
  const modal = document.getElementById("followers-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalList = document.getElementById("modal-list");
  const closeModalButton = document.querySelector(".close-modal");
  if (
    !followersCountButton ||
    !followingCountButton ||
    !modal ||
    !modalTitle ||
    !modalList ||
    !closeModalButton
  ) {
    console.error(
      "One or more required DOM elements for the modal are missing."
    );
    return;
  }
  followersCountButton.textContent = `${
    profileData._count?.followers || 0
  } followers`;
  followingCountButton.textContent = `${
    profileData._count?.following || 0
  } following`;

  async function openModal(listType) {
    let list = [];
    modalList.innerHTML = "";

    try {
      if (listType === "followers") {
        list = await fetchFollowers(username);
      } else if (listType === "following") {
        list = await fetchFollowing(username);
      }
    } catch (error) {
      console.error(`Error fetching ${listType}:`, error);
      alert(`Failed to load ${listType}. Please try again.`);
      return;
    }
    if (!list || list.length === 0) {
      alert(`No ${listType} to display.`);
      return;
    }
    list.forEach((user) => {
      const listItem = document.createElement("li");
      listItem.classList.add("flex", "items-center", "gap-2", "border-b", "border-gray-200", "pb-2", "last:border-none");
      listItem.innerHTML = `
                <img src="${
                  user.avatar?.url || "/images/default-avatar.png"
                }" alt="${user.name}" class="w-10 h-10 rounded-full object-cover border-2 border-darkgreen">
                <span class="font-medium text-black font-montserrat">${user.name}</span>
            `;
      modalList.appendChild(listItem);
    });
    modalTitle.textContent = `${
      listType.charAt(0).toUpperCase() + listType.slice(1)
    } List`;
    modal.style.display = "block";
  }
  followersCountButton.addEventListener("click", () => openModal("followers"));
  followingCountButton.addEventListener("click", () => openModal("following"));
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
