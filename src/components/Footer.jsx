import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import logo from "../assets/sonit-logo.png";
import ScrollToTopButton from "./ScrollToTopButton";

const Footer = () => (
  <footer className="w-full bg-gradient-to-r from-black to-[#183F8F] text-white flex flex-col items-center justify-center py-8 md:py-10 relative min-h-[180px] md:min-h-[220px] px-2">
    <img src={logo} alt="Sonit Logo" className="w-14 md:w-48
     mb-2" />
    
    {/* Social Media Icons */}
    <div className="flex items-center space-x-4 mb-3">
      <a 
        href="https://facebook.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
      >
        <FaFacebook className="text-2xl md:text-3xl" />
      </a>
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
      >
        <FaInstagram className="text-2xl md:text-3xl" />
      </a>
    </div>
    
    <div className="font-semibold text-base md:text-lg my-2 text-center">BORN TO PERFORM</div>
    <div className="text-xs md:text-sm text-gray-300 mb-2 text-center">© 2025 Sonic Custom. All rights reserved.</div>
    <ScrollToTopButton className="absolute right-10 bottom-8" />
  </footer>
);

export default Footer; 