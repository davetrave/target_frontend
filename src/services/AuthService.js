import axios from 'axios';

const VITE_API_URL = 'https://davemwh.pythonanywhere.com/';
//const VITE_API_URL = 'http://localhost:8000/';

const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
