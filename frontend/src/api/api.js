import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't try to refresh token for the refresh endpoint itself, login, register, or if already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/refresh_token') &&
      !originalRequest.url?.includes('/login') &&
      !originalRequest.url?.includes('/register')
    ) {
      originalRequest._retry = true;

      try {
        await api.post('/refresh_token');
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, don't retry again
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;