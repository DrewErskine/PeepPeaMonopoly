import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // Adjust the baseURL to your backend's URL
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem('authToken'); 
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
