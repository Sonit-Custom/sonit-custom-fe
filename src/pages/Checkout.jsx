import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import paymentAPI from '../services/paymentAPI';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Expected location.state: { product: { product_id, collection_name, price, image }, quantity }
  const { product, quantity: initialQty } = location.state || {};
  const quantity = initialQty || 1;
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(() => {
    if (!product) return 0;
    const price = Number(product.price) || 0;
    return price * quantity;
  }, [product, quantity]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-white">
          <p className="mb-4">Thiếu dữ liệu sản phẩm. Vui lòng chọn sản phẩm lại.</p>
          <button onClick={() => navigate('/store')} className="px-4 py-2 bg-[#e0d6ce] text-black rounded-lg font-semibold">Về cửa hàng</button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address || !phoneNumber) {
      alert('Vui lòng nhập đủ địa chỉ và số điện thoại');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        address,
        note,
        phone_number: phoneNumber,
        product: {
          product_id: product.product_id,
          quantity: Number(quantity) || 1,
        },
        user_id: user.user_id,
      };
      const res = await paymentAPI.createDirectPayment(payload);
      // Backend trả về { message: "{https://pay.payos.vn/web/...}" }
      const message = res?.message ?? res?.data?.message ?? '';
      const match = String(message).match(/https?:\/\/[^\s}]+/);
      if (match && match[0]) {
        const paymentUrl = match[0];
        window.open(paymentUrl, '_blank', 'noopener,noreferrer');
      } else {
        // Fallback nếu không tìm thấy URL
        alert('Không nhận được liên kết thanh toán hợp lệ.');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || 'Thanh toán thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-3 bg-white/10 border border-white/20 rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/80 mb-2">Địa chỉ</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#e0d6ce]"
                placeholder="Ví dụ: 32/2, Quận 1, TP.HCM"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-2">Số điện thoại</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#e0d6ce]"
                placeholder="Ví dụ: 0977610163"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-2">Ghi chú</label>
              <textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#e0d6ce]"
                placeholder="Yêu cầu thêm..."
              />
            </div>
            {/* Quantity được truyền trực tiếp từ ProductDetails, không chỉnh sửa tại đây */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#e0d6ce] to-[#f5e9d7] hover:from-[#f5e9d7] hover:to-[#e0d6ce] text-black py-4 rounded-2xl font-bold text-lg shadow-lg transition-all disabled:opacity-60"
            >
              {loading ? 'Đang xử lý...' : 'Thanh toán' }
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-2 bg-white/10 border border-white/20 rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-semibold text-white mb-4">Đơn hàng</h2>
          <div className="flex items-center gap-4 mb-4">
            <img src={product.image} alt={product.collection_name} className="w-20 h-20 rounded-xl object-cover border border-white/20" />
            <div className="flex-1">
              <p className="text-white font-medium">{product.collection_name}</p>
              <p className="text-white/70 text-sm">Mã: {product.product_id}</p>
            </div>
            <div className="text-right">
              <p className="text-[#e0d6ce] font-bold">${Number(product.price).toLocaleString()}</p>
              <p className="text-white/60 text-sm">x{quantity}</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 mt-4 space-y-2 text-white/80">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span className="text-white">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span className="text-white">$0</span>
            </div>
            <div className="flex justify-between font-semibold text-white pt-2 border-t border-white/10 mt-2">
              <span>Tổng</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


