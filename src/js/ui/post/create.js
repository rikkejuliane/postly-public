import { createPost } from "../../api/post/create.js";

console.log("Create post UI script loaded");

export async function onCreatePost(event) {
  console.log("onCreatePost function called");
  event.preventDefault();
  console.log("Default form submission prevented");

  const form = event.target;
  const formData = new FormData(form);

  const title = formData.get("title").trim();
  const body = formData.get("body").trim();
  const mediaUrl = formData.get("media").trim();
  const mediaAlt = formData.get("alt").trim();

  console.log("Form data:", { title, body, mediaUrl, mediaAlt });

  if (!title || !body) {
    alert("Title and body are required fields.");
    return;
  }

  const postData = {
    title,
    body,
    media: mediaUrl ? { url: mediaUrl, alt: mediaAlt } : undefined,
  };

  try {
    console.log("Sending post data:", postData);
    const response = await createPost(postData);

    if (response && response.data.id) {
      alert("Post created successfully!");
      //window.location.href = "/";
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error creating post:", error);
    alert(`Error creating post: ${error.message}`);
  }
}
