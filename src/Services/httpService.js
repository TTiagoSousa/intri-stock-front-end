import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

http.interceptors.response.use(
  response => {
    console.log("📥 [Axios] Resposta recebida:", response.config.url);
    return response;
  },
  error => {
    const status = error.response?.status;
    const fullUrl = error.config?.url || '';
    const normalizedUrl = fullUrl.replace(BASE_URL, ''); // tira a parte do domínio

    // ⛔ Ignorar silenciosamente erro 401 no /user/me
    if (status === 401 && normalizedUrl === '/user/me') {
      console.log("ℹ️ [Axios] Ignorado 401 esperado em /user/me");
      return Promise.reject(error);
    }

    // 👇 Outros tratamentos
    if (status === 401) {
      // console.warn("🔒 Não autorizado.");
    } else if (status === 429) {
      // console.warn("⏳ Muitas requisições!");
    } else if (status >= 500) {
      // console.warn("💥 Erro do servidor.");
    } else {
      // console.error(`❌ [Axios] Erro [${status}] em: ${fullUrl}`);
    }

    return Promise.reject(error);
  }
);

export default http;
