import axiosInstance from './axiosInstance';

const dashboardAPI = {
  getUsers: () => axiosInstance.get('/users'),
  getOrders: () => axiosInstance.get('/orders'),
  getProducts: () => axiosInstance.get('/products'),
  getCategories: () => axiosInstance.get('/categories'),
  getCollections: () => axiosInstance.get('/collections'),
  getRoles: () => axiosInstance.get('/roles'),
  getVouchers: () => axiosInstance.get('/vouchers'),
  getPayments: () => axiosInstance.get('/payments'),
};

export default dashboardAPI; 