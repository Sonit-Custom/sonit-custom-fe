import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVouchers } from '../../store/slices/dashboardSlice';

const VoucherManagement = () => {
  const dispatch = useDispatch();
  const { vouchers, isLoading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchVouchers());
  }, [dispatch]);
  
  const safeData = Array.isArray(vouchers) ? vouchers : [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý Vouchers</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}
      <table className="w-full text-left bg-white/10 rounded-lg">
        <thead>
          <tr className="border-b border-white/20">
            <th className="p-4">Voucher ID</th>
            <th className="p-4">Code</th>
            <th className="p-4">Discount</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Description</th>
            <th className="p-4">Expired At</th>
          </tr>
        </thead>
        <tbody>
          {safeData.map((item) => (
            <tr key={item.voucher_id} className="border-b border-white/10 hover:bg-white/5">
              <td className="p-4">{item.voucher_id}</td>
              <td className="p-4">{item.code}</td>
              <td className="p-4">{item.discount}%</td>
              <td className="p-4">{item.amount}</td>
              <td className="p-4">{item.description}</td>
              <td className="p-4">{new Date(item.expired_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoucherManagement; 