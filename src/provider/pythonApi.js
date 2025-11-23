import axios from "axios";

export const pythonApi = axios.create({
  baseURL: import.meta.env.VITE_CREF_URL_BACKEND,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: false
});