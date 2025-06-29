import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/sonit-logo.png";
import { FiShoppingCart, FiMenu, FiX, FiTrash2 } from "react-icons/fi";

const menu = [
  { label: "STORE", href: "/store" },
  { label: "CUSTOMIZE", href: "/customize" },
  { label: "ABOUT US", href: "#" },
  { label: "BLOG", href: "#" },
  { label: "SUPPORT", href: "#" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  // Mock cart data
  const [cartItems] = useState([
    {
      id: 1,
      name: "Nhẫn Kim Cương Tự Nhiên 18K",
      price: 2500,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&h=100&fit=crop",
      quantity: 1
    },
    {
      id: 2,
      name: "Vòng Tay Bạc 925",
      price: 180,
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&h=100&fit=crop",
      quantity: 2
    }
  ]);

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleLoginClick = () => {
    navigate('/login');
    setOpen(false); // Close mobile menu if open
  };

  const handleCustomizeClick = () => {
    navigate('/customize');
    setOpen(false); // Close mobile menu if open
  };

  const handleStoreClick = () => {
    navigate('/store');
    setOpen(false); // Close mobile menu if open
  };

  const handleMenuClick = (label) => {
    switch (label) {
      case "STORE":
        handleStoreClick();
        break;
      case "CUSTOMIZE":
        handleCustomizeClick();
        break;
      default:
        setOpen(false);
        break;
    }
  };

  const handleRemoveFromCart = (itemId) => {
    // Mock function - in real app would dispatch action
    console.log('Remove item:', itemId);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-gradient-to-r from-black to-[#183F8F]">
      <div className="flex items-center">
        <img src={logo} alt="Sonit Logo" className="w-24 md:w-36" />
      </div>
      {/* Desktop/tablet menu */}
      <nav className="hidden lg:flex flex-1 justify-center">
        {menu.map((item) => (
          <button
            key={item.label}
            onClick={() => handleMenuClick(item.label)}
            className="mx-3 text-s text-gray-200 tracking-widest hover:text-white transition-colors bg-transparent border-none cursor-pointer"
          >
            {item.label}
            {item.label === "SUPPORT" && <span className="ml-1">▼</span>}
          </button>
        ))}
      </nav>
      {/* Desktop/tablet actions */}
      <div className="hidden lg:flex items-center space-x-2">
        <button 
          onClick={handleLoginClick}
          className="px-4 py-1 border border-[#e0d6ce] rounded-full text-s text-white hover:bg-[#e0d6ce] hover:text-black transition-colors"
        >
          LOGIN
        </button>
        <button className="px-4 py-1 bg-[#e0d6ce] rounded-full text-s text-black hover:bg-[#d1c2b2] transition-colors">REGISTER</button>
        
        {/* Cart with dropdown */}
        <div className="relative">
          <button 
            onClick={() => setCartOpen(!cartOpen)}
            className="relative p-2 text-white hover:text-[#e0d6ce] transition-colors"
          >
            <FiShoppingCart className="text-2xl" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Cart Dropdown */}
          {cartOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl z-50">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">Giỏ hàng</h3>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="text-white/60 hover:text-white"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                {cartItems.length > 0 ? (
                  <>
                    <div className="max-h-64 overflow-y-auto space-y-3 mb-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                            <p className="text-[#e0d6ce] text-sm">${item.price.toLocaleString()}</p>
                            <p className="text-white/60 text-xs">Số lượng: {item.quantity}</p>
                          </div>
                          <button 
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-white font-semibold">Tổng cộng:</span>
                        <span className="text-[#e0d6ce] font-bold text-lg">${cartTotal.toLocaleString()}</span>
                      </div>
                      <button className="w-full bg-[#e0d6ce] hover:bg-[#d1c2b2] text-black py-2 px-4 rounded-lg font-medium transition-colors">
                        Thanh toán
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <FiShoppingCart className="text-4xl text-white/40 mx-auto mb-2" />
                    <p className="text-white/60">Giỏ hàng trống</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Mobile/tablet hamburger */}
      <button className="lg:hidden text-3xl text-white ml-2" onClick={() => setOpen(!open)}>
        <FiMenu />
      </button>
      {/* Mobile/tablet menu drawer: slide from right, fixed to right, overlay che toàn màn hình */}
      <div
        className={`fixed inset-0 z-40 flex lg:hidden transition-all duration-300 ${open ? 'bg-black bg-opacity-70' : 'pointer-events-none bg-transparent'}`}
        style={{ visibility: open ? 'visible' : 'hidden' }}
      >
        <div
          className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-gradient-to-r from-black to-[#183F8F] p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <button className="self-end text-2xl text-white mb-6" onClick={() => setOpen(false)}>&times;</button>
          {menu.map((item) => (
            <button
              key={item.label}
              onClick={() => handleMenuClick(item.label)}
              className="block w-full text-left py-3 px-2 text-base text-gray-100 border-b border-gray-700 hover:text-white bg-transparent border-none cursor-pointer"
            >
              {item.label}
              {item.label === "SUPPORT" && <span className="ml-1">▼</span>}
            </button>
          ))}
          <div className="flex flex-col mt-6 space-y-3">
            <button 
              onClick={handleLoginClick}
              className="w-full py-2 border border-[#e0d6ce] rounded-full text-s text-white hover:bg-[#e0d6ce] hover:text-black transition-colors"
            >
              LOGIN
            </button>
            <button className="w-full py-2 bg-[#e0d6ce] rounded-full text-s text-black hover:bg-[#d1c2b2] transition-colors">REGISTER</button>
            
            {/* Mobile Cart */}
            <div className="flex items-center justify-between py-2 px-2 text-white border-b border-gray-700">
              <div className="flex items-center">
                <FiShoppingCart className="text-2xl mr-2" />
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-[#e0d6ce] font-semibold">${cartTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
        {/* Click outside to close */}
        <div className="flex-1" onClick={() => setOpen(false)} />
      </div>
    </header>
  );
};

export default Header; 