import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./config";

let refreshPromise: Promise<string> | null = null;

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
  if (token) config.headers.set("Authorization", `Bearer ${token}`);

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
        if (!refreshPromise) {
          refreshPromise = await api
            .post("/token/refresh/", {
              refresh: refreshToken,
            })
            .then((response) => {
              const newToken = response.data?.access;
              localStorage.setItem(ACCESS_TOKEN, newToken);

              return newToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const newToken = await refreshPromise;
        originalRequest.headers.set("Authorization", `Bearer ${newToken}`);

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
