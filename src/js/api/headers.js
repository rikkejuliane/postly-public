import { API_KEY } from "./constants";
/**
 * Generates a Headers object with optional API key, authentication token, and content type.
 *
 * @param {Object} [options={}] - Options to customize the headers.
 * @param {boolean} [options.apiKey=true] - Whether to include the API key in the headers.
 * @param {boolean} [options.authToken=true] - Whether to include the Authorization token in the headers.
 * @param {boolean} [options.contentType=true] - Whether to include the Content-Type header.
 * @returns {Headers} A Headers object with the specified fields.
 */
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