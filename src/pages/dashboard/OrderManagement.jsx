import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/dashboardSlice';
import ordersAPI from '../../services/ordersAPI';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Handle case where orders might not be an array
  const safeOrders = Array.isArray(orders) ? orders : [];

  const statusBadge = (status) => (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded ${
        status === 'PENDING'
          ? 'bg-yellow-500/20 text-yellow-300'
          : status === 'CONFIRMED'
          ? 'bg-emerald-500/20 text-emerald-300'
          : status === 'SHIPPED'
          ? 'bg-blue-500/20 text-blue-300'
          : status === 'DELIVERED'
          ? 'bg-green-500/20 text-green-300'
          : status === 'CANCELLED'
          ? 'bg-red-500/20 text-red-300'
          : 'bg-white/10 text-white/80'
      }`}
    >
      {status}
    </span>
  );

  const handleMarkShipped = async (orderId) => {
    try {
      await ordersAPI.updateOrderStatus({ order_id: orderId, status: 'SHIPPED' });
      dispatch(fetchOrders());
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e.response?.data?.message || e.message || 'Không thể cập nhật trạng thái');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý Orders</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}
      <table className="w-full text-left bg-white/10 rounded-lg">
        <thead>
          <tr className="border-b border-white/20">
            <th className="p-4">Order ID</th>
            <th className="p-4">User ID</th>
            <th className="p-4">Total Amount</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {safeOrders.map((order) => (
            <tr key={order.order_id} className="border-b border-white/10 hover:bg-white/5">
              <td className="p-4 align-top">
                <div className="text-white/90 text-xs">{order.order_id}</div>
              </td>
              <td className="p-4 align-top">
                <div className="text-white/80">{order.user_id}</div>
              </td>
              <td className="p-4 align-top">
                <div className="text-[#e0d6ce] font-semibold">{`${Math.round(Number(order.total_amount) || 0).toLocaleString('vi-VN')} ₫`}</div>
              </td>
              <td className="p-4 align-top">{statusBadge(order.status)}</td>
              <td className="p-4 align-top">
                {order.status === 'CONFIRMED' ? (
                  <button
                    onClick={() => handleMarkShipped(order.order_id)}
                    className="px-3 py-1.5 rounded bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 text-sm"
                  >
                    Đã Gửi Hàng
                  </button>
                ) : (
                  <span className="text-white/40 text-xs">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement; 