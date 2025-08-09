import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/slices/dashboardSlice';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const safeData = Array.isArray(categories) ? categories : [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý Categories</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}
      <table className="w-full text-left bg-white/10 rounded-lg">
        <thead>
          <tr className="border-b border-white/20">
            <th className="p-4">Category ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Description</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {safeData.map((item) => (
            <tr key={item.category_id} className="border-b border-white/10 hover:bg-white/5">
              <td className="p-4">{item.category_id}</td>
              <td className="p-4">{item.category_name}</td>
              <td className="p-4">{item.description}</td>
              <td className="p-4">{item.active_status ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManagement; 