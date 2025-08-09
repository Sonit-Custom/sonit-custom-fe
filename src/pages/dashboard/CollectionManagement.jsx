import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollections } from '../../store/slices/dashboardSlice';

const CollectionManagement = () => {
  const dispatch = useDispatch();
  const { collections, isLoading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const safeData = Array.isArray(collections) ? collections : [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý Collections</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}
      <table className="w-full text-left bg-white/10 rounded-lg">
        <thead>
          <tr className="border-b border-white/20">
            <th className="p-4">Collection ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Description</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {safeData.map((item) => (
            <tr key={item.collection_id} className="border-b border-white/10 hover:bg-white/5">
              <td className="p-4">{item.collection_id}</td>
              <td className="p-4">{item.collection_name}</td>
              <td className="p-4">{item.description}</td>
              <td className="p-4">{item.active_status ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollectionManagement; 