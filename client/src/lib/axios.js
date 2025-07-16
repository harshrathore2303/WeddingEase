import axios from  "axios";

export const axiosInstance = axios.create({
    baseURL: "https://wedease-server.onrender.com/api",
    withCredentials: true,
})
