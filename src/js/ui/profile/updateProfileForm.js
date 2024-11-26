import { fetchProfile } from "../../api/profile/readProfile.js";
import { updateProfile } from "../../api/profile/update.js";

/**
 * Initializes the Update Profile form behavior.
 * 
 * @param {string} username - The username for the profile to update.
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
    // Fetch profile data to populate the form
    const profileData = await fetchProfile(username);

    // Pre-fill form inputs with current data
    avatarInput.value = profileData.avatar?.url || "";
    bannerInput.value = profileData.banner?.url || "";
    bioInput.value = profileData.bio || "";

    // Add toggle functionality for Update Profile button
    updateProfileButton.addEventListener("click", () => {
      updateFormSection.style.display = updateFormSection.style.display === "none" ? "block" : "none";
    });

    // Handle Update button click
    updateButton.addEventListener("click", async () => {
      try {
        const updatedData = {
          avatar: { url: avatarInput.value },
          banner: { url: bannerInput.value },
          bio: bioInput.value,
        };
        const updatedProfile = await updateProfile(username, updatedData);

        // Update UI with new data
        document.getElementById("profile-avatar").src = updatedProfile.avatar?.url || "/images/default-avatar.png";
        document.getElementById("banner-image").style.backgroundImage = `url('${updatedProfile.banner?.url || "/images/default-banner.jpg"}')`;
        document.getElementById("profile-bio").textContent = updatedProfile.bio || "No bio available.";

        // Hide form after update
        updateFormSection.style.display = "none";
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    });

    // Handle Cancel button click
    cancelButton.addEventListener("click", () => {
      updateFormSection.style.display = "none"; // Hide the form
      avatarInput.value = profileData.avatar?.url || ""; // Reset input fields
      bannerInput.value = profileData.banner?.url || "";
      bioInput.value = profileData.bio || "";
    });
  } catch (error) {
    console.error("Error initializing update profile form:", error);
  }
}
