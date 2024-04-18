import axios, { AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: 'application/json',
    },
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            useNavigate()('/login');
        }
        return Promise.reject(error);
    }
);

export default api;
