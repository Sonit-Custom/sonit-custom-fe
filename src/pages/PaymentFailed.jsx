import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiXCircle, FiHome, FiShoppingBag, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to home after 15 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 15000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleRetryPayment = () => {
    // Navigate back to cart or checkout page
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    navigate('/store');
  };

  const handleContactSupport = () => {
    // You can implement contact support functionality here
    alert('Liên hệ hỗ trợ: support@sonit.com');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white hover:text-[#e0d6ce] transition-colors"
              >
                <FiArrowLeft className="text-xl" />
                <span>Quay lại</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <FiXCircle className="text-8xl text-red-400" />
                </div>
                {/* Animated rings */}
                <div className="absolute inset-0 w-32 h-32 border-4 border-red-400/30 rounded-full animate-ping"></div>
                <div className="absolute inset-2 w-28 h-28 border-2 border-red-400/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>

            {/* Error Message */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold text-white mb-4">
                Thanh toán thất bại!
              </h1>
              <p className="text-white/80 text-lg mb-8">
                Rất tiếc, thanh toán của bạn không thể hoàn tất. Vui lòng kiểm tra lại thông tin và thử lại.
              </p>

              

              {/* Possible Solutions */}
              <div className="bg-white/5 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">Giải pháp khắc phục</h3>
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">1</span>
                    </div>
                    <span className="text-white/80">Kiểm tra lại thông tin thẻ tín dụng/ghi nợ</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">2</span>
                    </div>
                    <span className="text-white/80">Đảm bảo tài khoản có đủ số dư</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">3</span>
                    </div>
                    <span className="text-white/80">Thử lại với phương thức thanh toán khác</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">4</span>
                    </div>
                    <span className="text-white/80">Liên hệ ngân hàng nếu vấn đề vẫn tiếp tục</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRetryPayment}
                  className="flex items-center justify-center gap-2 bg-[#e0d6ce] hover:bg-[#d1c2b2] text-black py-3 px-6 rounded-xl font-medium transition-colors"
                >
                  <FiRefreshCw className="text-lg" />
                  Thử lại thanh toán
                </button>
                <button
                  onClick={handleGoHome}
                  className="flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 py-3 px-6 rounded-xl font-medium transition-colors"
                >
                  <FiHome className="text-lg" />
                  Về trang chủ
                </button>
              </div>

              {/* Additional Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <button
                  onClick={handleContinueShopping}
                  className="flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  <FiShoppingBag className="text-sm" />
                  Tiếp tục mua sắm
                </button>
                <button
                  onClick={handleContactSupport}
                  className="flex items-center justify-center gap-2 border border-red-400/50 text-red-400 hover:bg-red-400/10 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Liên hệ hỗ trợ
                </button>
              </div>

              {/* Auto redirect notice */}
              <p className="text-white/50 text-sm mt-6">
                Tự động chuyển về trang chủ sau 15 giây...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentFailed;
