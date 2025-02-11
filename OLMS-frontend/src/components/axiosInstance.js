import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
    const localStorageToken = localStorage.getItem("jwtToken");
    const sessionStorageToken = sessionStorage.getItem("jwtToken");
  
    // You can decide the priority here
    if (localStorageToken) {
      return localStorageToken; // Prioritize localStorage token
    } else if (sessionStorageToken) {
      return sessionStorageToken; // Fallback to sessionStorage token
    } else {
      return null; // No token available
    }
  };

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        //console.log("Request Config with Headers:", config);

        return config;
    },
    (error) => {
        console.error("Interpeter Error:",error);
        return Promise.reject(error);
    }
);


export default axiosInstance;