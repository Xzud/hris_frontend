import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./config";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) config.headers.set("Authorization", `Beaerer ${token}`);

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/token/refresh/", {
          refresh: refreshToken,
        });

        const newToken = response.data?.access;

        if (response.status === 200 && newToken) {
          localStorage.setItem(ACCESS_TOKEN, newToken);

          // Update the original request
          originalRequest.headers.set("Authorization", `Bearer ${newToken}`);

          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem(REFRESH_TOKEN);

        window.location.href = "/login"; // Return to login page

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
