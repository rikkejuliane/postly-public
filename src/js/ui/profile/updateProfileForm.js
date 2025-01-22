import { fetchProfile } from "../../api/profile/readProfile.js";
import { updateProfile } from "../../api/profile/update.js";
/**
 * Initializes the Update Profile form behavior.
 *
 * - Fetches the profile data using the `fetchProfile` function and pre-fills the form with the current profile information.
 * - Toggles the visibility of the form when the "Update Profile" button is clicked.
 * - Sends the updated profile data to the `updateProfile` API function when the "Save" button is clicked.
 * - Updates the profile page UI with the new data after a successful update.
 * - Allows the user to cancel the update and reset the form fields to their original values.
 *
 * @param {string} username - The username for the profile to update.
 * @returns {void}
 */
export async function initializeUpdateProfileForm(username) {
  const updateFormSection = document.getElementById("update-profile-form");
  const avatarInput = document.getElementById("avatar-url");
  const bannerInput = document.getElementById("banner-url");
  const bioInput = document.getElementById("bio");
  const updateButton = document.getElementById("save-profile");
  const cancelButton = document.getElementById("cancel-update");
  const updateProfileButton = document.getElementById("update-profile-button");
  try {
    const profileData = await fetchProfile(username);
    avatarInput.value = profileData.avatar?.url || "";
    bannerInput.value = profileData.banner?.url || "";
    bioInput.value = profileData.bio || "";
    updateProfileButton.addEventListener("click", () => {
      updateFormSection.style.display =
        updateFormSection.style.display === "none" ? "flex" : "none";
    });
    updateButton.addEventListener("click", async () => {
      try {
        const updatedData = {
          avatar: { url: avatarInput.value },
          banner: { url: bannerInput.value },
          bio: bioInput.value,
        };
        const updatedProfile = await updateProfile(username, updatedData);

        document.getElementById("profile-avatar").src =
          updatedProfile.avatar?.url || "/images/default-avatar.png";
        document.getElementById("banner-image").style.backgroundImage = `url('${
          updatedProfile.banner?.url || "/images/default-banner.jpg"
        }')`;
        document.getElementById("profile-bio").textContent =
          updatedProfile.bio || "No bio available.";

        updateFormSection.style.display = "none";
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    });
    cancelButton.addEventListener("click", () => {
      updateFormSection.style.display = "none";
      avatarInput.value = profileData.avatar?.url || "";
      bannerInput.value = profileData.banner?.url || "";
      bioInput.value = profileData.bio || "";
    });
  } catch (error) {
    console.error("Error initializing update profile form:", error);
  }
}
