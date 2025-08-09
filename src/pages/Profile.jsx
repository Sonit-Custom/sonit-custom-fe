import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <div className="text-center py-12 text-white">Không tìm thấy thông tin người dùng.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-white">Thông tin cá nhân</h1>
      <div className="flex items-center gap-6 mb-8">
        <img
          src={user.profile_avatar || 'https://placehold.co/80x80'}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border-4 border-white/30 shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold text-white mb-1">{user.full_name}</h2>
          <p className="text-white/80">{user.email}</p>
          <p className="text-white/60 text-sm">Role: {user.role_id}</p>
        </div>
      </div>
      <div className="bg-white/10 rounded-xl p-6 border border-white/20 mb-8">
        <h3 className="text-lg font-semibold text-white mb-2">Thông tin chi tiết</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
          <div><span className="font-medium text-white">User ID:</span> {user.user_id}</div>
          <div><span className="font-medium text-white">Giới tính:</span> {user.gender || 'N/A'}</div>
          <div><span className="font-medium text-white">VIP:</span> {user.is_vip ? 'Có' : 'Không'}</div>
          <div><span className="font-medium text-white">Ngày tạo:</span> {new Date(user.created_at).toLocaleDateString()}</div>
        </div>
      </div>
      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-2">Đơn hàng của bạn</h3>
        <div className="text-white/60 italic">(Chức năng này sẽ hiển thị khi API hoàn thiện)</div>
      </div>
    </div>
  );
};

export default Profile; 