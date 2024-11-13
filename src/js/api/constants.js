export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_SOCIAL = `${API_BASE}/social`;

export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`;

export const API_SOCIAL_POSTS_UPDATE = `${API_SOCIAL}/posts/<id>`; // For updating posts

export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;

export const API_SOCIAL_PROFILES_SINGLE = `${API_SOCIAL}/profiles/<name>`; // For a single profile

export const API_SOCIAL_PROFILES_UPDATE = `${API_SOCIAL}/profiles/<name>`; // For updating profiles

export const API_SOCIAL_PROFILES_FOLLOW = `${API_SOCIAL}/profiles/<name>/follow`;

export const API_SOCIAL_PROFILES_UNFOLLOW = `${API_SOCIAL}/profiles/<name>/unfollow`;

export const API_SOCIAL_PROFILES_SEARCH = `${API_SOCIAL}/profiles/search`;

export const API_SOCIAL_POSTS_REACT = `${API_SOCIAL}/posts/<id>/react/<symbol>`;
