import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import paymentAPI from '../services/paymentAPI';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // location.state có thể là:
  // - { product, quantity } từ ProductDetails (thanh toán trực tiếp 1 SP)
  // - { items: [{ product_id, quantity, name, image, price }] } từ Cart (thanh toán nhiều SP)
  const { product, quantity: initialQty, items: cartItemsFromState } = location.state || {};
  const quantity = initialQty || 1;
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(() => {
    if (Array.isArray(cartItemsFromState) && cartItemsFromState.length > 0) {
      return cartItemsFromState.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0);
    }
    if (!product) return 0;
    const price = Number(product.price) || 0;
    return price * quantity;
  }, [product, quantity, cartItemsFromState]);

  const shipping = useMemo(() => 0, []); // Free Ship
  const total = useMemo(() => subtotal, [subtotal]); // Không VAT

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!product && (!Array.isArray(cartItemsFromState) || cartItemsFromState.length === 0)) {
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
      let res;
      if (Array.isArray(cartItemsFromState) && cartItemsFromState.length > 0) {
        const payload = {
          address,
          note,
          phone_number: phoneNumber,
          items: cartItemsFromState.map((it) => ({ product_id: it.product_id, quantity: Number(it.quantity) || 1 })),
          user_id: user.user_id,
          currency: 'VND',
        };
        res = await paymentAPI.createCartPayment(payload);
      } else {
        const payload = {
          address,
          note,
          phone_number: phoneNumber,
          product: {
            product_id: product.product_id,
            quantity: Number(quantity) || 1,
          },
          user_id: user.user_id,
          currency: 'VND',
        };
        res = await paymentAPI.createDirectPayment(payload);
      }
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
          <h1 className="text-2xl font-bold text-white mb-6">Thanh toán</h1>
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
          {Array.isArray(cartItemsFromState) && cartItemsFromState.length > 0 ? (
            <div className="space-y-3 mb-2">
              {cartItemsFromState.map((it) => (
                <div key={it.product_id} className="flex items-center gap-4">
                  <img src={it.image} alt={it.name} className="w-16 h-16 rounded-xl object-cover border border-white/20" />
                  <div className="flex-1">
                    <p className="text-white font-medium">{it.name}</p>
                    <p className="text-white/70 text-xs">Mã: {it.product_id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#e0d6ce] font-semibold text-sm">{`${Math.round(Number(it.price) || 0).toLocaleString('vi-VN')} ₫`}</p>
                    <p className="text-white/60 text-xs">x{it.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-4 mb-4">
              <img src={product.image} alt={product.collection_name} className="w-20 h-20 rounded-xl object-cover border border-white/20" />
              <div className="flex-1">
                <p className="text-white font-medium">{product.collection_name}</p>
                <p className="text-white/70 text-sm">Mã: {product.product_id}</p>
              </div>
              <div className="text-right">
                <p className="text-[#e0d6ce] font-bold">{`${Math.round(Number(product.price) || 0).toLocaleString('vi-VN')} ₫`}</p>
                <p className="text-white/60 text-sm">x{quantity}</p>
              </div>
            </div>
          )}
          <div className="border-t border-white/10 pt-4 mt-4 space-y-2 text-white/80">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span className="text-white">{`${Math.round(subtotal).toLocaleString('vi-VN')} ₫`}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span className="text-white">Miễn phí</span>
            </div>
            <div className="flex justify-between font-semibold text-white pt-2 border-t border-white/10 mt-2">
              <span>Tổng</span>
              <span>{`${Math.round(total).toLocaleString('vi-VN')} ₫`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


