import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://adya-project-hypertradex.onrender.com",
});

export default axiosInstance;
