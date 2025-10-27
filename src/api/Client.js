import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem("app_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default {
  login: (p) => api.post("/auth/login", p),
  register: (p) => api.post("/auth/register", p),
  getSummaryTypes: () => api.get("/solicitudes/summary/types"),
  getSummaryMonthly: () => api.get("/solicitudes/summary/monthly"),
  getSolicitudes: (params) => api.get("/solicitudes", { params }),
  postSolicitud: (p) => api.post("/solicitudes", p)
};