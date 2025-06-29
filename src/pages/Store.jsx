import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';

const Store = () => {
  // Mock data sản phẩm
  const [products] = useState([
    {
      id: 1,
      name: 'Nhẫn Kim Cương Tự Nhiên 18K',
      price: 2500,
      category: 'Nhẫn',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
      description: 'Nhẫn kim cương tự nhiên 1.5 carat, vàng 18K'
    },
    {
      id: 2,
      name: 'Vòng Tay Bạc 925 Thổ Nhĩ Kỳ',
      price: 180,
      category: 'Vòng',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
      description: 'Vòng tay bạc 925 thổ nhĩ kỳ, thiết kế tinh tế'
    },
    {
      id: 3,
      name: 'Dây Chuyền Vàng 14K',
      price: 450,
      category: 'Dây chuyền',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
      description: 'Dây chuyền vàng 14K với charm hình trái tim'
    },
    {
      id: 4,
      name: 'Bông Tai Ngọc Trai Freshwater',
      price: 120,
      category: 'Bông tai',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
      description: 'Bông tai ngọc trai freshwater tự nhiên'
    },
    {
      id: 5,
      name: 'Nhẫn Cưới Vàng Trắng 18K',
      price: 800,
      category: 'Nhẫn',
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2b9?w=400&h=400&fit=crop',
      description: 'Nhẫn cưới vàng trắng 18K, thiết kế cổ điển'
    },
    {
      id: 6,
      name: 'Lắc Chân Bạc 925',
      price: 95,
      category: 'Lắc',
      image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop',
      description: 'Lắc chân bạc 925 với charm hình bướm'
    }
  ]);

  // State cho filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Danh mục sản phẩm
  const categories = ['Nhẫn', 'Vòng', 'Dây chuyền', 'Bông tai', 'Lắc'];

  // Logic lọc và sắp xếp sản phẩm
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Lọc theo tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo danh mục
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Sắp xếp
    switch (sortBy) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'name-asc':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
      default:
        return [...filtered].sort((a, b) => b.id - a.id);
    }
  }, [products, searchTerm, sortBy, selectedCategories]);

  // Xử lý chọn/bỏ chọn danh mục
  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Xử lý click vào sản phẩm
  const handleProductClick = (product) => {
    console.log('Clicked product:', product);
    // Có thể thêm navigation đến trang chi tiết sản phẩm
    alert(`Đã chọn: ${product.name}`);
  };

  // Xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    // Có thể thêm logic dispatch action để thêm vào Redux store
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
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
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:w-1/4 w-full">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20 lg:sticky lg:top-8">
              <h2 className="text-xl font-bold text-white mb-6">Bộ lọc</h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">Tìm kiếm</label>
                <input
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">Sắp xếp</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                  <option value="name-asc">Tên A-Z</option>
                </select>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">Danh mục</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-white/80 hover:text-white transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedCategories.length > 0 || sortBy !== 'newest') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategories([]);
                    setSortBy('newest');
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Xóa bộ lọc
                </button>
              )}

              {/* Results Count */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-white/60 text-sm">
                  Hiển thị {filteredAndSortedProducts.length} / {products.length} sản phẩm
                </p>
              </div>
            </div>
          </div>

          {/* Main Content - Products Grid */}
          <div className="lg:w-3/4 w-full">
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
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
                    Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store; 