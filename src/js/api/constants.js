export const API_KEY = "175b27d2-e7de-4e22-bffc-76b4d3897a54";

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_SOCIAL = `${API_BASE}/social`;

export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`;

export const API_SOCIAL_POSTS_UPDATE = `${API_SOCIAL}/posts/<id>`;

export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;

export const API_SOCIAL_PROFILES_SINGLE = `${API_SOCIAL}/profiles/<name>`;

export const API_SOCIAL_PROFILES_UPDATE = `${API_SOCIAL}/profiles/<name>`;

export const API_SOCIAL_PROFILES_FOLLOW = (username) =>
  `${API_SOCIAL}/profiles/${username}/follow`;

export const API_SOCIAL_PROFILES_UNFOLLOW = (username) =>
  `${API_SOCIAL}/profiles/${username}/unfollow`;

export const API_SOCIAL_PROFILES_SEARCH = `${API_SOCIAL}/profiles/search`;

export const API_SOCIAL_POSTS_REACT = `${API_SOCIAL}/posts/<id>/react/<symbol>`;
