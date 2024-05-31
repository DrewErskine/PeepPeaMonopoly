import axios from 'axios';

// Replace with your actual username and password for Basic Auth
const username = 'sarah1';
const password = 'abc123';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the Basic Auth header
apiClient.interceptors.request.use(config => {
    const token = btoa(`${username}:${password}`);
    config.headers['Authorization'] = `Basic ${token}`;
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiClient;
