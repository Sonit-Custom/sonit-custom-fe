import axiosInstance from './axiosInstance';

const paymentAPI = {
  /**
   * Tạo yêu cầu thanh toán trực tiếp
   * @param {Object} payload - { address, note, phone_number, product: { product_id, quantity }, user_id }
   * @returns {Promise<any>}
   */
  createDirectPayment: async (payload) => {
    const response = await axiosInstance.post('/payments/create/direct', payload);
    return response.data;
  },

  /**
   * Tạo yêu cầu thanh toán từ giỏ hàng
   * @param {Object} payload - { address, items: [{ product_id, quantity }], note, phone_number, user_id }
   * @returns {Promise<any>}
   */
  createCartPayment: async (payload) => {
    const response = await axiosInstance.post('/payments/create/cart', payload);
    return response.data;
  },
};

export default paymentAPI;


