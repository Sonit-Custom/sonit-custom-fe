import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { fetchCart } from '../store/slices/cartSlice';

const Store = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, isLoading, error } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Xử lý click vào sản phẩm
  const handleProductClick = (product) => {
    navigate(`/product/${product.product_id}`);
  };

  // Xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    if (!user) {
      alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
      navigate('/login');
      return;
    }
    const payload = {
      quantity: 1, // Mặc định thêm 1 sản phẩm từ trang Store
      request: {
        product_id: product.product_id,
        user_id: user.user_id,
      },
    };
    dispatch(addToCart(payload)).unwrap()
      .then(() => {
        dispatch(fetchCart(user.user_id)); // Fetch lại cart để cập nhật UI
      })
      .catch((err) => alert(`Lỗi: ${err}`));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-white">Cửa hàng</h1>
          <p className="text-white/70 mt-1">Khám phá bộ sưu tập trang sức độc đáo</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <p className="mt-4 text-white">Đang tải sản phẩm...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-500/20 p-6 rounded-2xl border border-red-400/30">
              <h3 className="text-xl font-semibold text-red-200 mb-2">Lỗi</h3>
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        ) : Array.isArray(products) && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.product_id}
                product={product}
                name={product.collection_name}
                image={product.image}
                price={product.price}
                onClick={() => handleProductClick(product)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <svg className="w-16 h-16 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-white/60">
                Hiện tại chưa có sản phẩm nào.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store; 