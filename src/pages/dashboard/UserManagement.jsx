import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/slices/dashboardSlice';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý Users</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}
      {users && (
        <table className="w-full text-left bg-white/10 rounded-lg">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-4">User ID</th>
              <th className="p-4">Full Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id} className="border-b border-white/10 hover:bg-white/5">
                <td className="p-4">{user.user_id}</td>
                <td className="p-4">{user.full_name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement; 