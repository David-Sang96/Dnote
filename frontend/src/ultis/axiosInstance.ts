import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 440) {
      localStorage.removeItem("authUser");
      window.location.href = "/log-in";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
