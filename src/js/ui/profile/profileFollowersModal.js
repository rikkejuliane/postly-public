import { fetchFollowers, fetchFollowing } from "../../api/profile/readProfile.js";

/**
 * Initializes the follower and following modal functionality.
 *
 * @param {string} username - The username for the profile whose followers/following will be fetched.
 * @param {Object} profileData - The profile data containing the counts of followers and following.
 */
export function initializeProfileFollowersModal(username, profileData) {
    // Check if necessary DOM elements exist
    const followersCountButton = document.getElementById("followers-count");
    const followingCountButton = document.getElementById("following-count");
    const modal = document.getElementById("followers-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalList = document.getElementById("modal-list");
    const closeModalButton = document.querySelector(".close-modal");

    // If any of these elements are missing, log an error and return
    if (!followersCountButton || !followingCountButton || !modal || !modalTitle || !modalList || !closeModalButton) {
        console.error("One or more required DOM elements for the modal are missing.");
        return;
    }

    // Populate follower and following counts
    followersCountButton.textContent = `${profileData._count?.followers || 0} followers`;
    followingCountButton.textContent = `${profileData._count?.following || 0} following`;

    /**
     * Opens a modal displaying followers or following.
     *
     * @param {string} listType - Either "followers" or "following".
     */
    async function openModal(listType) {
        let list = [];
        modalList.innerHTML = ""; // Clear existing modal content

        try {
            if (listType === "followers") {
                console.log(`Fetching followers for ${username}...`);
                list = await fetchFollowers(username); // Fetch followers
                console.log("Fetched followers:", list);
            } else if (listType === "following") {
                console.log(`Fetching following for ${username}...`);
                list = await fetchFollowing(username); // Fetch following
                console.log("Fetched following:", list);
            }
        } catch (error) {
            console.error(`Error fetching ${listType}:`, error);
            alert(`Failed to load ${listType}. Please try again.`);
            return;
        }

        // Handle empty lists
        if (!list || list.length === 0) {
            alert(`No ${listType} to display.`);
            return;
        }

        // Populate the modal content
        list.forEach((user) => {
            const listItem = document.createElement("li");
            listItem.classList.add("modal-list-item");
            listItem.innerHTML = `
                <img src="${user.avatar?.url || '/images/default-avatar.png'}" alt="${user.name}" class="user-avatar">
                <span>${user.name}</span>
            `;
            modalList.appendChild(listItem);
        });

        modalTitle.textContent = `${listType.charAt(0).toUpperCase() + listType.slice(1)} List`;
        modal.style.display = "block"; // Display the modal
        console.log(`${listType} modal displayed.`);
    }

    // Attach event listeners for buttons
    followersCountButton.addEventListener("click", () => openModal("followers"));
    followingCountButton.addEventListener("click", () => openModal("following"));

    // Close modal functionality
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none"; // Hide modal
    });

    // Close modal by clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            console.log("Modal closed by clicking outside.");
        }
    });
}
