import axios from "axios";

export const caringuApi = axios.create({
  baseURL: import.meta.env.VITE_CARINGU_URL_BACKEND,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true, // Necessário para enviar cookies HttpOnly
});

// request = requisição
caringuApi.interceptors.request.use(
  (config) => {
    // Com cookies HttpOnly, o token é enviado automaticamente
    // Não precisamos mais adicionar o Authorization header manualmente
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