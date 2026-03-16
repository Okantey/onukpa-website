import axios from "axios";

// Default to localhost:3000 where the onukpa-bot backend might run locally
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.onukpa.com/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
