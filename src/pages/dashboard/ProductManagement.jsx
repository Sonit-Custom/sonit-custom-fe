import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/dashboardSlice';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const safeData = Array.isArray(products) ? products : [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý Products</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}
      <table className="w-full text-left bg-white/10 rounded-lg">
        <thead>
          <tr className="border-b border-white/20">
            <th className="p-4">Product ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Color</th>
            <th className="p-4">Size</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {safeData.map((item) => (
            <tr key={item.product_id} className="border-b border-white/10 hover:bg-white/5">
              <td className="p-4">{item.product_id}</td>
              <td className="p-4">{item.collection_name}</td>
              <td className="p-4">{`${Math.round(Number(item.price) || 0).toLocaleString('vi-VN')} ₫`}</td>
              <td className="p-4">{item.color}</td>
              <td className="p-4">{item.size}</td>
              <td className="p-4">{item.active_status ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement; 