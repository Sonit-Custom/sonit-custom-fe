import axiosInstance from './axiosInstance';

const API_ENDPOINTS = {
  ADD_ITEM: '/carts/item/add',
  GET_CART: '/carts',
  REMOVE_ITEM: '/carts/item/remove',
};

const cartAPI = {
  /**
   * Thêm sản phẩm vào giỏ hàng
   * @param {object} payload - Dữ liệu gửi lên { quantity, request: { product_id, user_id } }
   * @returns {Promise}
   */
  addToCart: async (payload) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.ADD_ITEM, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Lấy giỏ hàng theo User ID
   * @param {string} userId - ID của user
   * @returns {Promise}
   */
  getCartByUserId: async (userId) => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.GET_CART}/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Xóa sản phẩm khỏi giỏ hàng
   * @param {object} payload - { product_id, user_id }
   * @returns {Promise}
   */
  removeFromCart: async (payload) => {
    try {
      // Using DELETE method for removing an item is more conventional.
      // The payload is passed in the 'data' property of the config object.
      const response = await axiosInstance.delete(API_ENDPOINTS.REMOVE_ITEM, { data: payload });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default cartAPI; 