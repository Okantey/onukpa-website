import axios from "axios";

/**
 * Base URL for onukpa-bot HTTP API (includes `/api` prefix).
 * Example: `http://localhost:3000/api` — see docs/INTEGRATION.md
 */
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const reqUrl = String(err.config?.url ?? "");
    if (
      err.response?.status === 401 &&
      !reqUrl.includes("/auth/login")
    ) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      delete apiClient.defaults.headers.common.Authorization;
      if (
        typeof window !== "undefined" &&
        window.location.pathname.startsWith("/admin") &&
        !window.location.pathname.includes("/admin/login")
      ) {
        window.location.assign("/admin/login");
      }
    }
    return Promise.reject(err);
  }
);

export default apiClient;
