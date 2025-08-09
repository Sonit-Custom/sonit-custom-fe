import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { FiHeart, FiBox, FiClock, FiTag, FiPlus, FiMinus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, fetchAllProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { fetchCart } from '../store/slices/cartSlice';

const RON_SIZES = ['8mm', '9mm', '10mm', '11.5mm', '12mm', '13mm'];

const mockShipping = {
  discount: 'Disc 50%',
  package: 'Gói tiêu chuẩn',
  delivery: '3-4 ngày làm việc',
  estimate: '10 - 12 Tháng 10, 2024',
};

const mockReview = {
  rating: 4.5,
  count: 50,
  details: [35, 10, 3, 1, 1],
  user: {
    name: 'Alex Mathio',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '13 Oct 2024',
    comment: '“NextGen’s dedication to sustainability and ethical practices resonates strongly with today’s consumers, positioning the brand as a responsible choice in the fashion world.”',
    stars: 5,
  },
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { 
    selectedProduct: product, 
    items: allProducts,
    isLoading, 
    error 
  } = useSelector((state) => state.products);

  const { user } = useSelector((state) => state.auth);
  const { isLoading: isCartLoading, error: cartError } = useSelector((state) => state.cart);

  const [mainImg, setMainImg] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    // Fetch all products if not already in state, for similar products section
    if (allProducts.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [id, dispatch, allProducts.length]);

  useEffect(() => {
    if (product) {
      // API chỉ trả về 1 ảnh, nên ta tạo mảng 1 ảnh
      setMainImg(product.image || '');
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
      navigate('/login');
      return;
    }
    const payload = {
      quantity,
      request: {
        product_id: product.product_id,
        user_id: user.user_id,
      },
    };
    dispatch(addToCart(payload)).unwrap()
      .then(() => {
        alert('Thêm vào giỏ hàng thành công!');
        dispatch(fetchCart(user.user_id)); // Fetch lại cart để cập nhật UI
      })
      .catch((err) => alert(`Lỗi: ${err}`));
  };

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="bg-red-500/20 p-8 rounded-2xl border border-red-400/30 text-center">
          <h2 className="text-2xl text-red-200 font-bold mb-4">Lỗi</h2>
          <p className="text-red-300">{error}</p>
          <button onClick={() => navigate('/store')} className="px-4 py-2 bg-[#e0d6ce] rounded-lg text-black font-semibold mt-4">Quay lại cửa hàng</button>
        </div>
      </div>
    );
  }

  // Sản phẩm tương tự (cùng category, khác id)
  const similarProducts = allProducts.filter(p => p.category_id === product.category_id && p.product_id !== product.product_id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black py-10 px-2 md:px-6">
      {/* Nút quay lại store ngay dưới header, trên toàn bộ khối nội dung */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => navigate('/store')}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-[#e0d6ce] hover:text-black hover:border-[#e0d6ce] transition-all duration-300 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Quay lại cửa hàng</span>
        </button>
      </div>
      {/* Nút quay lại store nằm trên box hình ảnh */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Gallery & Info */}
        <div className="lg:col-span-3 flex flex-col md:flex-row gap-10">
          {/* Gallery */}
          <div className="flex flex-col gap-4 w-full md:w-[380px] lg:w-[420px] xl:w-[480px] mx-auto">
            <div className="bg-white/10 rounded-3xl border-2 border-white/20 shadow-xl flex items-center justify-center aspect-square max-w-full max-h-[420px] mx-auto overflow-hidden">
              <img src={mainImg} alt={product.collection_name} className="object-contain w-full h-full max-w-[400px] max-h-[400px] transition-all duration-300" />
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              {/* API chỉ có 1 ảnh, nên chỉ hiển thị 1 thumbnail */}
              <button onClick={() => setMainImg(product.image)} className={`w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 border-[#e0d6ce] overflow-hidden bg-white/10`}>
                <img src={product.image} alt="thumb" className="object-cover w-full h-full" />
              </button>
            </div>
          </div>
          {/* Info */}
          <div className="flex-1 flex flex-col gap-6 justify-between">
            <div>
              <span className="inline-block mb-2 px-4 py-1 bg-gradient-to-r from-blue-700 to-blue-400 text-white text-xs font-bold rounded-full uppercase tracking-widest border border-white/20">{product.category_id}</span>
              <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg leading-tight">{product.collection_name}</h1>
              <p className="text-[#e0d6ce] text-3xl font-bold mb-4 drop-shadow">${product.price.toLocaleString()}</p>
              <div className="flex items-center gap-2 mb-4">
                <FiClock className="text-[#e0d6ce]" />
                <span className="text-white/80 text-sm">Giao hàng dự kiến: <b>10-12/10/2024</b></span>
              </div>
              {/* Quantity Selector */}
              <div className="mb-8">
                <div className="flex flex-col gap-2">
                  <span className="text-white/80 font-medium mb-1">Số lượng:</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                      <FiMinus />
                    </button>
                    <span className="text-xl font-bold text-white w-12 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isCartLoading}
                className="w-full bg-gradient-to-r from-[#e0d6ce] to-[#f5e9d7] hover:from-[#f5e9d7] hover:to-[#e0d6ce] text-black py-5 rounded-3xl font-bold text-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border border-[#e0d6ce] flex items-center justify-center gap-2 mt-2 mb-2 disabled:opacity-50"
              >
                {isCartLoading ? 'Đang thêm...' : <>Thêm vào giỏ hàng <FiHeart className="ml-2 text-2xl text-[#183F8F]" /></>}
              </button>
              {cartError && <p className="text-red-400 text-center mt-2">{cartError}</p>}
              <button className="w-full bg-gradient-to-r from-[#183F8F] to-black hover:from-black hover:to-[#183F8F] text-white py-5 rounded-3xl font-bold text-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border border-[#183F8F] flex items-center justify-center gap-2 mb-2">
                Mua ngay
              </button>
            </div>
            {/* Description & Shipping */}
            <div className="flex flex-col gap-8 mt-6">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-7 shadow-inner min-h-[120px] flex flex-col justify-center">
                <h2 className="text-lg font-semibold text-white mb-4">Mô tả sản phẩm</h2>
                <p className="text-white/80 text-base leading-relaxed break-words">{product.description}</p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-2xl p-7 shadow-inner flex flex-col gap-5 min-h-[120px] justify-center">
                <h2 className="text-lg font-semibold text-white mb-4">Vận chuyển</h2>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col text-white/80 text-sm">
                    <span className="text-xs">Ưu đãi:</span>
                    <span className="font-bold text-base text-white">{mockShipping.discount}</span>
                  </div>
                  <div className="flex flex-col text-white/80 text-sm">
                    <span className="text-xs">Gói:</span>
                    <span className="font-bold text-base text-white">{mockShipping.package}</span>
                  </div>
                  <div className="flex flex-col text-white/80 text-sm">
                    <span className="text-xs">Thời gian:</span>
                    <span className="font-bold text-base text-white">{mockShipping.delivery}</span>
                  </div>
                  <div className="flex flex-col text-white/80 text-sm">
                    <span className="text-xs">Dự kiến:</span>
                    <span className="font-bold text-base text-white">{mockShipping.estimate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar - Similar Products */}
        <div className="w-full lg:col-span-1 bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-3xl p-4 border border-white/20 h-fit shadow-xl">
          <h2 className="text-lg font-bold text-white mb-3">Sản phẩm tương tự</h2>
          {similarProducts.length > 0 ? (
            <div className="space-y-3">
              {similarProducts.map(sp => (
                <div key={sp.product_id} className="transition-transform duration-200 hover:scale-105">
                  <ProductCard product={sp} onClick={() => navigate(`/product/${sp.product_id}`)} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/60 text-sm">Không có sản phẩm tương tự</p>
          )}
        </div>
      </div>
      {/* Rating & Reviews */}
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1 flex flex-col items-center justify-center bg-white/10 rounded-3xl p-8 border border-white/20 shadow-xl">
          <div className="flex items-center mb-2">
            <span className="text-5xl font-extrabold text-white mr-2">{mockReview.rating}</span>
            <span className="text-2xl text-white/60">/5</span>
          </div>
          <p className="text-white/60 mb-4">({mockReview.count} đánh giá mới)</p>
          <div className="w-full space-y-1">
            {[5,4,3,2,1].map((star, idx) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-[#e0d6ce]">★</span>
                <div className="flex-1 bg-white/20 rounded h-2 overflow-hidden">
                  <div className="bg-[#e0d6ce] h-2 rounded" style={{width: `${(mockReview.details[5-star] / mockReview.count) * 100}%`}}></div>
                </div>
                <span className="text-white/60 text-xs w-6 text-right">{mockReview.details[5-star]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 bg-white/10 rounded-3xl p-8 border border-white/20 shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-4 mb-2">
            <img src={mockReview.user.avatar} alt="avatar" className="w-12 h-12 rounded-full border-2 border-[#e0d6ce]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{mockReview.user.name}</span>
                <span className="text-[#e0d6ce]">{Array(mockReview.user.stars).fill('★').join('')}</span>
                <span className="text-white/60 text-xs ml-2">{mockReview.user.date}</span>
              </div>
              <p className="text-white/80 mt-2">{mockReview.user.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 