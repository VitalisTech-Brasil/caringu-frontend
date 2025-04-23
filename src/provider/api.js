import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_ENDERECO_API,
  headers: {
    "Content-Type": "application/json"
  },
});