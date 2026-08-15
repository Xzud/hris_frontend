import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.set("Authorization", `Beaerer ${token}`);

  return config;
});
