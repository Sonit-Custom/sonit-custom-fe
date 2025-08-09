import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/dashboardSlice';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Handle case where orders might not be an array
  const safeOrders = Array.isArray(orders) ? orders : [];

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
          </tr>
        </thead>
        <tbody>
          {safeOrders.map((order) => (
            <tr key={order.order_id} className="border-b border-white/10 hover:bg-white/5">
              <td className="p-4">{order.order_id}</td>
              <td className="p-4">{order.user_id}</td>
              <td className="p-4">{order.total_amount}</td>
              <td className="p-4">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement; 