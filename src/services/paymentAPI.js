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
};

export default paymentAPI;


