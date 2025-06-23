import React from "react";
import logo from "../assets/sonit-logo.png";
import ScrollToTopButton from "./ScrollToTopButton";

const Footer = () => (
  <footer className="w-full bg-gradient-to-r from-[#232946] to-[#183F8F] text-white flex flex-col items-center justify-center py-8 md:py-10 relative min-h-[180px] md:min-h-[220px] px-2">
    <img src={logo} alt="Sonit Logo" className="w-14 md:w-48
     mb-2" />
    <div className="font-semibold text-base md:text-lg my-2 text-center">BORN TO PERFORM</div>
    <div className="text-xs md:text-sm text-gray-300 mb-2 text-center">© 2025 Sonic Custom. All rights reserved.</div>
    <ScrollToTopButton className="absolute right-10 bottom-8" />
  </footer>
);

export default Footer; 