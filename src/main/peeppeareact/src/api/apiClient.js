import axios from 'axios';
import { useAuth } from '../AuthContext'; 

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(config => {
    const { authToken } = useAuth();
    if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiClient;
