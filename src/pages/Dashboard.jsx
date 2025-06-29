import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import sonitLogo from '../assets/sonit-logo.png';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full blur-xl animate-pulse delay-3000"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                <img 
                  src={sonitLogo} 
                  alt="Sonit Logo" 
                  className="h-8 w-auto drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">Dashboard</h1>
                <p className="text-white/80 text-sm">Hệ thống quản lý Bi-da</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {user?.name || 'User'}
                </p>
                <p className="text-sm text-white/70">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-red-400/30 hover:border-red-400/50 backdrop-blur-sm"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center">
            <div className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 animate-glow">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                Đăng nhập thành công!
              </h2>
            </div>
            <p className="text-white/80 mb-8 text-lg">
              Bạn đã đăng nhập thành công và đang xem một trang được bảo vệ. 
              Điều này chứng minh rằng hệ thống authentication đang hoạt động chính xác.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">
                Thông tin người dùng
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Tên:</span>
                  <span className="font-medium text-white">{user?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Email:</span>
                  <span className="font-medium text-white">{user?.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">ID:</span>
                  <span className="font-medium text-white">{user?.id || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Tính năng đã được triển khai:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    <span className="text-white/90 text-sm">Redux Toolkit state management</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    <span className="text-white/90 text-sm">JWT token authentication</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    <span className="text-white/90 text-sm">Automatic token refresh</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    <span className="text-white/90 text-sm">Protected routes</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    <span className="text-white/90 text-sm">Persistent login state</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    <span className="text-white/90 text-sm">Axios interceptors</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-3">
                🎱 Hệ thống Bi-da chuyên nghiệp
              </h3>
              <p className="text-white/80 text-sm">
                Đây là một hệ thống quản lý Bi-da hiện đại với giao diện đẹp mắt và 
                tính năng bảo mật cao. Sẵn sàng để tích hợp với backend API thực tế.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating elements for decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-16 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-20 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute bottom-1/3 right-8 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-3000"></div>
      </div>
    </div>
  );
};

export default Dashboard; 