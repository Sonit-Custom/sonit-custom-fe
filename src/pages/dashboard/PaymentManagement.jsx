import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments } from '../../store/slices/dashboardSlice';

const statusBadge = (status) => (
  <span
    className={`text-xs font-semibold px-2 py-1 rounded ${
      status === 'PAID'
        ? 'bg-green-500/20 text-green-300'
        : status === 'CANCELLED'
        ? 'bg-red-500/20 text-red-300'
        : 'bg-white/10 text-white/80'
    }`}
  >
    {status}
  </span>
);

const PaymentManagement = () => {
  const dispatch = useDispatch();
  const { payments, isLoading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const safePayments = Array.isArray(payments) ? payments : [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý Payments</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white/10 rounded-lg">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-4">Payment ID</th>
              <th className="p-4">User ID</th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Currency</th>
              <th className="p-4">Status</th>
              <th className="p-4">Method</th>
              <th className="p-4">Created At</th>
            </tr>
          </thead>
          <tbody>
            {safePayments.map((p) => (
              <tr key={p.payment_id} className="border-b border-white/10 hover:bg-white/5">
                <td className="p-4 text-white/90 text-xs">{p.payment_id}</td>
                <td className="p-4">{p.user_id}</td>
                <td className="p-4 text-white/90 text-xs">{p.order_id}</td>
                <td className="p-4 text-white/90 text-xs">{p.transaction_id}</td>
                <td className="p-4 text-green-300 font-semibold">{`${Math.round(Number(p.amount) || 0).toLocaleString('vi-VN')} ₫`}</td>
                <td className="p-4">{p.currency}</td>
                <td className="p-4">{statusBadge(p.status)}</td>
                <td className="p-4">{p.method}</td>
                <td className="p-4">{new Date(p.created_at).toLocaleString('vi-VN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;


