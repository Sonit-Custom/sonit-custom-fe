import axiosInstance from './axiosInstance';

const ordersAPI = {
  /**
   * Lấy 1 trang đơn hàng theo user
   * @param {string} userId
   * @param {number} pageNumber
   * @returns {Promise<{ data: Array, page_number: number, total_pages: number }>}
   */
  getOrdersByUserIdPage: async (userId, pageNumber = 1) => {
    const response = await axiosInstance.get(`/orders/user/${userId}`, {
      params: { page_number: pageNumber },
    });
    // Kỳ vọng API trả: { data: [...], page_number, total_pages }
    return {
      data: response.data?.data || [],
      page_number: Number(response.data?.page_number) || pageNumber,
      total_pages: Number(response.data?.total_pages) || 1,
    };
  },

  /**
   * Lấy tất cả đơn hàng của user (gộp tất cả các trang)
   * Lưu ý: Gọi nhiều request -> chỉ dùng khi cần lọc ở client
   * @param {string} userId
   * @returns {Promise<Array>}
   */
  getAllOrdersByUserId: async (userId) => {
    // Gọi trang 1 để biết tổng số trang
    const firstPage = await ordersAPI.getOrdersByUserIdPage(userId, 1);
    let all = [...firstPage.data];

    const totalPages = firstPage.total_pages || 1;
    for (let page = 2; page <= totalPages; page += 1) {
      const pageResult = await ordersAPI.getOrdersByUserIdPage(userId, page);
      all = all.concat(pageResult.data);
    }
    return all;
  },

  /**
   * Giữ lại hàm cũ cho tương thích ngược: trả về trang 1 (mảng data)
   * @param {string} userId
   * @returns {Promise<Array>}
   */
  getOrdersByUserId: async (userId) => {
    const { data } = await ordersAPI.getOrdersByUserIdPage(userId, 1);
    return data;
  },
};

export default ordersAPI;


