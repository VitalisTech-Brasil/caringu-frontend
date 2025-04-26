import axios from "axios";

export const caringuApi = axios.create({
  baseURL: import.meta.env.VITE_CARINGU_URL_BACKEND,
  headers: {
    "Content-Type": "application/json"
  },
});