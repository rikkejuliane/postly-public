// Base URL for the API
const API_URL = "https://v2.api.noroff.dev/social/";

// Auth Endpoints
export const REGISTER_URL = `${API_URL}auth/register`;
export const LOGIN_URL = `${API_URL}auth/login`;

// Posts Endpoints
export const POSTS_URL = `${API_URL}posts`;
export const SINGLE_POST_URL = (postId) => `${API_URL}posts/${postId}`;
export const CREATE_POST_URL = `${API_URL}posts`;
export const UPDATE_POST_URL = (postId) => `${API_URL}posts/${postId}`;
export const DELETE_POST_URL = (postId) => `${API_URL}posts/${postId}`;
export const LIKE_POST_URL = (postId) => `${API_URL}posts/${postId}/like`;
export const UNLIKE_POST_URL = (postId) => `${API_URL}posts/${postId}/unlike`;

// Profiles Endpoints
export const PROFILE_URL = (userName) => `${API_URL}profiles/${userName}`;
export const USER_POSTS_URL = (userName) =>
  `${API_URL}profiles/${userName}/posts`;
export const FOLLOW_USER_URL = (userName) =>
  `${API_URL}profiles/${userName}/follow`;
export const UNFOLLOW_USER_URL = (userName) =>
  `${API_URL}profiles/${userName}/unfollow`;
export const UPDATE_PROFILE_URL = (userName) =>
  `${API_URL}profiles/${userName}`;
