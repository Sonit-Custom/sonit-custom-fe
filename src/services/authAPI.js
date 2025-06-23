import axiosInstance from './axiosInstance';

// Cập nhật các endpoint API thật của bạn ở đây
const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/profile',
};

const authAPI = {
  /**
   * Login với email và password
   * @param {string} email - Email user
   * @param {string} password - Password user
   * @returns {Promise} - Trả về user data và tokens
   */
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Refresh access token bằng refresh token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise} - Trả về access token và refresh token mới
   */
  refreshToken: async (refreshToken) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.REFRESH, {
        refreshToken,
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   * @returns {Promise} - Response logout
   */
  logout: async () => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.LOGOUT);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Lấy thông tin profile user hiện tại
   * @returns {Promise} - Trả về thông tin user
   */
  getProfile: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.PROFILE);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Export luôn authAPI để sử dụng API thật
export default authAPI; 