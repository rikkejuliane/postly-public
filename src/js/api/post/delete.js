import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";
/**
 * Deletes a post by its ID.
 *
 * @param {?} id - The ID of the post to delete. Fill in the appropriate type.
 * @returns {?} What the fucntion returns. Choose an appropriate return type.
 * @throws {Error} If the API request fails.
 */

export async function deletePost(id) {
  if (!id) {
    throw new Error("No post ID provided.");
  }

  const options = {
    method: "DELETE",
    headers: headers(),
  };

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, options);

    if (response.status === 204) {
      return;
    }

    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.message || "Failed to delete post");
    }

    return response.json();
  } catch (error) {
    console.error("Detailed API Error:", error);
    throw error;
  }
}
