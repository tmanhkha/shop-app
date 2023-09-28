import axios from "axios";
import { API_HOST } from "@/constants";
import {
  getAuthTokenFromLocalStorage,
  removeUserFromLocalStorage,
} from "@/utils/authUtils";

const api = axios.create({
  baseURL: API_HOST,
  headers: { "Access-Control-Allow-Origin": "*" },
});

api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.put["Content-Type"] = "application/json";
api.defaults.headers.patch["Content-Type"] = "application/json";

api.interceptors.request.use((config) => {
  const authToken = getAuthTokenFromLocalStorage();

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([401].includes(error.response?.status)) {
      removeUserFromLocalStorage();
      window.location.href = "/sign_in";
    }
    return Promise.reject(error);
  },
);

export default api;
