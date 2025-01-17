import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    
});

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error("Interpeter Error:",error);
        return Promise.reject(error);
    }
);


export default axiosInstance;