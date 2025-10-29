import axios from 'axios';
import { environment } from '../../environments/environment';

const api = axios.create({
  baseURL: `${environment.apiUrl}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use((res) => res, async (error) => {
  const originalRequest = error.config

  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true

    const response = await axios.get(`${environment.apiUrl}/auth/refresh`, { withCredentials: true })
    localStorage.setItem('accessToken',response.data.accessToken)
  }
})

export default api