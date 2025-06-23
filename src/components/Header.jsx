import React, { useState } from "react";
import logo from "../assets/sonit-logo.png";
import { FiShoppingCart, FiMenu } from "react-icons/fi";

const menu = [
  { label: "STORE", href: "#" },
  { label: "CATALOGUE", href: "#" },
  { label: "ABOUT US", href: "#" },
  { label: "BLOG", href: "#" },
  { label: "SUPPORT", href: "#" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full flex items-center justify-between px-4 md:px-8 py-3 bg-gradient-to-r from-[#232946] to-[#183F8F]">
      <div className="flex items-center">
        <img src={logo} alt="Sonit Logo" className="w-24 md:w-36" />
      </div>
      {/* Desktop/tablet menu */}
      <nav className="hidden md:flex flex-1 justify-center">
        {menu.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="mx-3 text-s text-gray-200 tracking-widest hover:text-white transition-colors"
          >
            {item.label}
            {item.label === "SUPPORT" && <span className="ml-1">▼</span>}
          </a>
        ))}
      </nav>
      {/* Desktop/tablet actions */}
      <div className="hidden md:flex items-center space-x-2">
        <button className="px-4 py-1 border border-[#e0d6ce] rounded-full text-s text-white hover:bg-[#e0d6ce] hover:text-black transition-colors">LOGIN</button>
        <button className="px-4 py-1 bg-[#e0d6ce] rounded-full text-s text-black hover:bg-[#d1c2b2] transition-colors">REGISTER</button>
        <FiShoppingCart className="ml-3 text-3xl text-white cursor-pointer" />
      </div>
      {/* Mobile hamburger */}
      <button className="md:hidden text-3xl text-white ml-2" onClick={() => setOpen(!open)}>
        <FiMenu />
      </button>
      {/* Mobile menu drawer: slide from right, fixed to right, overlay che toàn màn hình */}
      <div
        className={`fixed inset-0 z-40 flex md:hidden transition-all duration-300 ${open ? 'bg-black bg-opacity-70' : 'pointer-events-none bg-transparent'}`}
        style={{ visibility: open ? 'visible' : 'hidden' }}
      >
        <div
          className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-gradient-to-r from-[#232946] to-[#183F8F] p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <button className="self-end text-2xl text-white mb-6" onClick={() => setOpen(false)}>&times;</button>
          {menu.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block py-3 px-2 text-base text-gray-100 border-b border-gray-700 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
              {item.label === "SUPPORT" && <span className="ml-1">▼</span>}
            </a>
          ))}
          <div className="flex flex-col mt-6 space-y-3">
            <button className="w-full py-2 border border-[#e0d6ce] rounded-full text-s text-white hover:bg-[#e0d6ce] hover:text-black transition-colors">LOGIN</button>
            <button className="w-full py-2 bg-[#e0d6ce] rounded-full text-s text-black hover:bg-[#d1c2b2] transition-colors">REGISTER</button>
            <button className="w-full flex items-center justify-center py-2 text-white"><FiShoppingCart className="text-2xl mr-2" /> Cart</button>
          </div>
        </div>
        {/* Click outside to close */}
        <div className="flex-1" onClick={() => setOpen(false)} />
      </div>
    </header>
  );
};

export default Header; 