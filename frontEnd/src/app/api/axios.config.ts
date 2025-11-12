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
    const newToken = response.data.accessToken
    localStorage.setItem('accessToken', newToken)
    originalRequest.headers.Authorization = `Bearer ${newToken}`
    return api(originalRequest)
  }
  return Promise.reject(error);
})

export default api