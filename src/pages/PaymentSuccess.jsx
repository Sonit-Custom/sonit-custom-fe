import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to home after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleContinueShopping = () => {
    navigate('/store');
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
            {/* Success Icon */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <FiCheckCircle className="text-8xl text-green-400" />
                </div>
                {/* Animated rings */}
                <div className="absolute inset-0 w-32 h-32 border-4 border-green-400/30 rounded-full animate-ping"></div>
                <div className="absolute inset-2 w-28 h-28 border-2 border-green-400/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold text-white mb-4">
                Thanh toán thành công!
              </h1>
              <p className="text-white/80 text-lg mb-8">
                Cảm ơn bạn đã mua sắm tại Sonit. Đơn hàng của bạn đã được xác nhận và sẽ được xử lý sớm nhất.
              </p>

              

              {/* Next Steps */}
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Bước tiếp theo</h3>
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">1</span>
                    </div>
                    <span className="text-white/80">Chúng tôi sẽ gửi email xác nhận đơn hàng</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">2</span>
                    </div>
                    <span className="text-white/80">Đơn hàng sẽ được chuẩn bị và đóng gói</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">3</span>
                    </div>
                    <span className="text-white/80">Bạn sẽ nhận được thông báo khi đơn hàng được giao</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleGoHome}
                  className="flex items-center justify-center gap-2 bg-[#e0d6ce] hover:bg-[#d1c2b2] text-black py-3 px-6 rounded-xl font-medium transition-colors"
                >
                  <FiHome className="text-lg" />
                  Về trang chủ
                </button>
                <button
                  onClick={handleContinueShopping}
                  className="flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 py-3 px-6 rounded-xl font-medium transition-colors"
                >
                  <FiShoppingBag className="text-lg" />
                  Tiếp tục mua sắm
                </button>
              </div>

              {/* Auto redirect notice */}
              <p className="text-white/50 text-sm mt-6">
                Tự động chuyển về trang chủ sau 10 giây...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
