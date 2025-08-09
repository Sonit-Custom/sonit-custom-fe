import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product, name, image, price, onClick, onAddToCart }) => {
  const prod = product || { name, image, price };
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(prod);
    }
  };

  return (
    <div 
      className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden hover:shadow-lg hover:shadow-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <h3 className="text-white font-semibold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-[#e0d6ce] transition-colors">
          {prod.collection_name || prod.name}
        </h3>
        
        <p className="text-sm text-white/70 mb-3">Màu: <span className="font-semibold">{prod.color}</span></p>

        <div className="flex flex-col gap-2">
          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-[#e0d6ce] font-bold text-lg sm:text-xl">
              ${prod.price.toLocaleString()}
            </span>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Add to Cart Button - Primary Action */}
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#e0d6ce] hover:bg-[#d1c2b2] text-black px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FiShoppingCart className="text-sm" />
              Thêm vào giỏ
            </button>
            
            {/* View Details Button - Secondary Action */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick(prod);
              }}
              className="flex-1 bg-transparent border border-[#e0d6ce] text-[#e0d6ce] hover:bg-[#e0d6ce] hover:text-black px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 