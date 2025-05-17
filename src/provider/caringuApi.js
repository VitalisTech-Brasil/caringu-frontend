import axios from "axios";

export const caringuApi = axios.create({
  baseURL: import.meta.env.VITE_CARINGU_URL_BACKEND,
  headers: {
    "Content-Type": "application/json"
  },
});

// request = requisição
caringuApi.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// response = resposta
caringuApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event("sessaoExpirada"));
    }

    return Promise.reject(error);
  }
);