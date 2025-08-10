import axiosInstance from './axiosInstance';

const ordersAPI = {
  /**
   * Lấy danh sách đơn hàng của người dùng
   * @param {string} userId
   * @returns {Promise<Array>}
   */
  getOrdersByUserId: async (userId) => {
    const response = await axiosInstance.get(`/orders/user/${userId}`);
    // API mẫu: { data: [...] }
    return response.data?.data || [];
  },
};

export default ordersAPI;


