import axios from "axios";


let accessToken: string | null = null;

const isMock =
  process.env.NEXT_PUBLIC_API_MODE === "mock";

export function setAccessToken(token: string) {
  accessToken = token;
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token); 
  }
}

export function getAccessToken() {
  if (accessToken) return accessToken;
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export function clearAccessToken() {
  accessToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}

// axios instance
const api = axios.create({
  baseURL: isMock
    ? ""
    : process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle 401 by refreshing once
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/auth/token/refresh/`,
          {},
          { withCredentials: true }
        );

        setAccessToken(data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch {
        clearAccessToken();
        throw new Error("Unauthorized - please login again");
      }
    }

    return Promise.reject(err);
  }
);

export default api;
