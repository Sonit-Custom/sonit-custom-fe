import axiosInstance from './axiosInstance';

const API_ENDPOINTS = {
  GET_ALL_PRODUCTS: '/products/customer-ui',
  GET_PRODUCT: '/products',
};

const productAPI = {
  /**
   * Lấy tất cả sản phẩm
   * @returns {Promise} - Trả về danh sách sản phẩm
   */
  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_PRODUCTS);
      return response.data.data; // Lấy mảng 'data' từ response
    } catch (error) {
      throw error;
    }
  },

  /**
   * Lấy sản phẩm theo ID
   * @param {string} id - ID của sản phẩm
   * @returns {Promise} - Trả về chi tiết sản phẩm
   */
  getProductById: async (id) => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.GET_PRODUCT}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default productAPI; 