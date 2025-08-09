import axios from 'axios';
import { store } from '../store/store';
import { logout, setTokens } from '../store/slices/authSlice';
import authAPI from './authAPI';

// Create axios instance với API thật
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Response interceptor to handle token refresh (TẠM THỜI VÔ HIỆU HÓA)
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
    
//     // If error is 401, not a refresh token request, and we haven't already tried to refresh
//     if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh-token') {
//       originalRequest._retry = true;

//       const state = store.getState();
//       const refreshToken = state.auth.refreshToken;
      
//       if (refreshToken) {
//         try {
//           // Try to refresh the token
//           const response = await authAPI.refreshToken(refreshToken);
          
//           // Update tokens in store
//           store.dispatch(setTokens({
//             accessToken: response.accessToken,
//             refreshToken: response.refreshToken,
//           }));
          
//           // Retry the original request with new token
//           originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
//           return axiosInstance(originalRequest);
//         } catch (refreshError) {
//           // If refresh fails, logout the user
//           store.dispatch(logout());
//           return Promise.reject(refreshError);
//         }
//       } else {
//         // No refresh token available, logout
//         store.dispatch(logout());
//         return Promise.reject(error);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

export default axiosInstance; 