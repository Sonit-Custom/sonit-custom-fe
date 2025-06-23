import React, { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return show ? (
    <button
      className="fixed right-6 bottom-6 z-50 bg-[#e0d6ce] text-black rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-2xl hover:bg-[#d1c2b2] transition-colors hidden md:flex"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="Scroll to top"
    >
      ↑
    </button>
  ) : null;
};

export default ScrollToTopButton; 