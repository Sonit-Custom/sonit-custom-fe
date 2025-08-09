import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiCreditCard, FiTruck, FiShield } from 'react-icons/fi';
import { removeFromCart, fetchCart, addToCart } from '../store/slices/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: cartItems, isLoading, error } = useSelector((state) => state.cart);

  const [quantities, setQuantities] = useState({});

  // Initialize quantities from cart items
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const initialQuantities = {};
      cartItems.forEach(item => {
        initialQuantities[item.product_id] = item.quantity || 1;
      });
      setQuantities(initialQuantities);
    }
  }, [cartItems]);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const quantity = quantities[item.product_id] || item.quantity || 1;
    return total + (item.price * quantity);
  }, 0);

  const shipping = subtotal > 500000 ? 0 : (subtotal > 0 ? 50000 : 0); // Free shipping for orders over 500,000 VND
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));

    // Update cart in backend if user is authenticated
    if (user && user.user_id) {
      try {
        const payload = {
          quantity: newQuantity,
          request: {
            product_id: productId,
            user_id: user.user_id,
          },
        };
        await dispatch(addToCart(payload)).unwrap();
        dispatch(fetchCart(user.user_id));
      } catch (error) {
        console.error('Failed to update quantity:', error);
        // Revert the quantity change if update fails
        setQuantities(prev => ({
          ...prev,
          [productId]: cartItems.find(item => item.product_id === productId)?.quantity || 1
        }));
      }
    }
  };

  const handleRemoveItem = (productId) => {
    if (!user) return;
    const payload = {
      product_id: productId,
      user_id: user.user_id,
    };
    dispatch(removeFromCart(payload)).unwrap()
      .then(() => {
        dispatch(fetchCart(user.user_id));
      })
      .catch(err => {
        alert(`Lỗi khi xóa sản phẩm: ${err}`);
      });
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để thanh toán!');
      navigate('/login');
      return;
    }
    // TODO: Implement checkout functionality
    alert('Chức năng thanh toán sẽ được triển khai sớm!');
  };

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
          {/* Header */}
          <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-white/20 rounded animate-pulse"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded animate-pulse"></div>
                  <div>
                    <div className="w-32 h-8 bg-white/20 rounded animate-pulse mb-2"></div>
                    <div className="w-24 h-4 bg-white/20 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items Skeleton */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
                  <div className="p-6 border-b border-white/20">
                    <div className="w-48 h-6 bg-white/20 rounded animate-pulse"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-white/20 rounded-xl animate-pulse"></div>
                      <div className="flex-1">
                        <div className="w-32 h-6 bg-white/20 rounded animate-pulse mb-2"></div>
                        <div className="w-24 h-4 bg-white/20 rounded animate-pulse mb-4"></div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                          <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                          <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary Skeleton */}
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <div className="w-32 h-6 bg-white/20 rounded animate-pulse mb-6"></div>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <div className="w-20 h-4 bg-white/20 rounded animate-pulse"></div>
                      <div className="w-16 h-4 bg-white/20 rounded animate-pulse"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-24 h-4 bg-white/20 rounded animate-pulse"></div>
                      <div className="w-16 h-4 bg-white/20 rounded animate-pulse"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-16 h-4 bg-white/20 rounded animate-pulse"></div>
                      <div className="w-16 h-4 bg-white/20 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="w-full h-12 bg-white/20 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
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
              <div className="flex items-center gap-3">
                <FiShoppingCart className="text-3xl text-[#e0d6ce]" />
                <div>
                  <h1 className="text-3xl font-bold text-white">Giỏ hàng</h1>
                  <p className="text-white/70">{cartItems.length} sản phẩm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 max-w-md mx-auto">
                <FiShoppingCart className="text-6xl text-white/40 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">Giỏ hàng trống</h2>
                <p className="text-white/60 mb-8">
                  Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá cửa hàng của chúng tôi!
                </p>
                <button
                  onClick={() => navigate('/store')}
                  className="bg-[#e0d6ce] hover:bg-[#d1c2b2] text-black py-3 px-8 rounded-xl font-medium transition-colors"
                >
                  Mua sắm ngay
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
                  <div className="p-6 border-b border-white/20">
                    <h2 className="text-xl font-bold text-white">Sản phẩm trong giỏ hàng</h2>
                  </div>
                  <div className="divide-y divide-white/20">
                    {cartItems.map((item) => (
                      <div key={item.product_id} className="p-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image_url || item.image}
                            alt={item.name || item.collection_name}
                            className="w-20 h-20 object-cover rounded-xl"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-lg truncate">
                              {item.name || item.collection_name || 'Sản phẩm không tên'}
                            </h3>
                            <p className="text-[#e0d6ce] text-lg font-bold">
                              ${(item.price || 0).toLocaleString()}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleQuantityChange(item.product_id, (quantities[item.product_id] || 1) - 1)}
                                  className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center justify-center"
                                  disabled={(quantities[item.product_id] || 1) <= 1}
                                >
                                  <FiMinus className="text-sm" />
                                </button>
                                <span className="text-white font-semibold w-8 text-center">
                                  {quantities[item.product_id] || 1}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item.product_id, (quantities[item.product_id] || 1) + 1)}
                                  className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center justify-center"
                                >
                                  <FiPlus className="text-sm" />
                                </button>
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.product_id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                                title="Xóa sản phẩm"
                              >
                                <FiTrash2 className="text-lg" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold text-lg">
                              ${((item.price || 0) * (quantities[item.product_id] || 1)).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sticky top-8">
                  <h2 className="text-xl font-bold text-white mb-6">Tóm tắt đơn hàng</h2>
                  
                  {/* Order Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Tạm tính:</span>
                      <span className="text-white font-semibold">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Phí vận chuyển:</span>
                      <span className="text-white font-semibold">
                        {shipping === 0 ? 'Miễn phí' : `$${shipping.toLocaleString()}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Thuế (10%):</span>
                      <span className="text-white font-semibold">${tax.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-bold text-lg">Tổng cộng:</span>
                        <span className="text-[#e0d6ce] font-bold text-2xl">${total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="bg-white/5 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <FiTruck className="text-[#e0d6ce] text-xl" />
                      <span className="text-white font-semibold">Thông tin vận chuyển</span>
                    </div>
                    <p className="text-white/70 text-sm">
                      {subtotal > 500000 
                        ? '🎉 Giao hàng miễn phí cho đơn hàng của bạn!' 
                        : `Thêm $${(500000 - subtotal).toLocaleString()} để được giao hàng miễn phí`
                      }
                    </p>
                  </div>

                  {/* Security Info */}
                  <div className="bg-white/5 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <FiShield className="text-[#e0d6ce] text-xl" />
                      <span className="text-white font-semibold">Bảo mật thanh toán</span>
                    </div>
                    <p className="text-white/70 text-sm">
                      Thông tin thanh toán của bạn được bảo mật 100% với SSL encryption
                    </p>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#e0d6ce] hover:bg-[#d1c2b2] text-black py-4 px-6 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-3"
                    disabled={cartItems.length === 0}
                  >
                    <FiCreditCard className="text-xl" />
                    {cartItems.length === 0 ? 'Giỏ hàng trống' : 'Thanh toán ngay'}
                  </button>

                  {/* Continue Shopping */}
                  <button
                    onClick={() => navigate('/store')}
                    className="w-full mt-4 border border-white/30 text-white hover:bg-white/10 py-3 px-6 rounded-xl font-medium transition-colors"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default Cart;
