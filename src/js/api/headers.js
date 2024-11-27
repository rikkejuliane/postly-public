import { API_KEY } from "./constants";

export function headers({ apiKey = true, authToken = true, contentType = true } = {}) {
  const headers = new Headers();

  if (apiKey) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (authToken) {
    const token = (typeof localStorage !== "undefined" && localStorage.getItem("token")) || "token";
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (contentType) {
    headers.append("Content-Type", "application/json");
  }

  return headers;
}