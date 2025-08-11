import axiosInstance from './axiosInstance';

// Cập nhật các endpoint API thật của bạn ở đây
const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh-token',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/profile',
  GET_USER_BY_ID: '/users', // base path
  CREATE_USER: '/users/create',
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
      // Chuẩn hóa key cho slice
      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        user: null // Nếu API trả user thì lấy, không thì null
      };
    } catch (error) {
      throw error;
    }
  },

  // refreshToken: async (refreshToken) => {
  //   try {
  //     const response = await axiosInstance.post(API_ENDPOINTS.REFRESH, {
  //       refresh_token: refreshToken,
  //     });
  //     // Chuẩn hóa key cho slice
  //     return {
  //       accessToken: response.data.access_token,
  //       refreshToken: refreshToken, // API không trả refresh_token mới
  //       user: null
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  /**
   * Logout user
   * @returns {Promise} - Response logout
   */
  logout: async (id) => {
    try {
      // Endpoint là /auth/logout/{id}
      const response = await axiosInstance.post(`${API_ENDPOINTS.LOGOUT}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Đăng ký tài khoản mới
   * @param {{ email: string, full_name: string, gender: 'male'|'female'|'other', password: string }} payload
   * @returns {Promise<any>} - Thông tin kết quả đăng ký
   */
  register: async (payload) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.CREATE_USER, payload);
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

  /**
   * Lấy thông tin profile user hiện tại
   * @returns {Promise} - Trả về thông tin user
   */
  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.GET_USER_BY_ID}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Export luôn authAPI để sử dụng API thật
export default authAPI; 