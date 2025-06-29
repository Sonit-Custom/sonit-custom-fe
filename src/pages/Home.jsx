import React, { useState } from "react";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import logo from "../assets/sonit-logo.png";

const SLIDER_IMAGES = [
  "https://placehold.co/1200x600?text=Billiard+Table+1",
  "https://placehold.co/1200x600?text=Billiard+Table+2",
  "https://placehold.co/1200x600?text=Billiard+Table+3",
  "https://placehold.co/1200x600?text=Billiard+Table+4"
];

const PRODUCT_IMAGES = [
  "https://placehold.co/400x300?text=Product+1",
  "https://placehold.co/400x300?text=Product+2",
  "https://placehold.co/400x300?text=Product+3"
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const total = SLIDER_IMAGES.length;

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent((idx + total) % total);
  };
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // Featured products data
  const FEATURED = [
    {
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      title: "EXTENDER",
      desc: "Add power to your cue",
      tags: ["Premium", "Custom"]
    },
    {
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=81",
      title: "BUMPER",
      desc: "Bumper for Pro extensions",
      tags: ["Custom", "Accessories"]
    },
    {
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=82",
      title: "JOINT PROTECTOR",
      desc: "Best protection for your cues",
      tags: ["Custom", "Protection"]
    },
    {
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=83",
      title: "REPAIR & REFINISH",
      desc: "Professional cue repair service",
      tags: ["Service", "Maintenance"]
    },
  ];

  // Best-selling designs data
  const BEST_SELLING = [
    {
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=90",
      rank: 2,
      crownColor: "#bfc1c2", // bạc
      borderColor: "#bfc1c2",
      imgClass: "h-64 w-56 sm:h-72 sm:w-60",
    },
    {
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=91",
      rank: 1,
      crownColor: "#FFD700", // vàng
      borderColor: "#FFD700",
      imgClass: "h-80 w-72 sm:h-96 sm:w-80",
    },
    {
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=92",
      rank: 3,
      crownColor: "#cd7f32", // đồng
      borderColor: "#cd7f32",
      imgClass: "h-64 w-56 sm:h-72 sm:w-60",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex flex-col justify-center">
      {/* HERO SECTION */}
      <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-center min-h-[60vh] lg:min-h-[70vh]">
        {/* Left: Logo + Text + Button */}
        <div className="flex flex-1 justify-center items-center px-6 lg:w-1/2 w-full z-10 h-full">
          <div className="flex flex-col items-center justify-center w-full text-center max-w-xl">
            {/* Logo */}
            <img src={logo} alt="Logo" className="mb-10 w-56 h-28 object-contain mx-auto" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              “Your Game,<br />Your Style”
            </h1>
            <p className="text-lg md:text-xl text-[#e0d6ce] font-semibold mb-6">
              - Personalize Your Billiard Cue Today!
            </p>
            <button
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#e0d6ce] hover:bg-[#d1c2b2] text-black font-semibold text-lg shadow-lg transition-all duration-200 border-none outline-none mx-auto"
            >
              Custom Now <FiArrowRight className="ml-1 text-xl" />
            </button>
          </div>
        </div>
        {/* Right: Slider */}
        <div className="relative flex-1 flex items-center justify-center min-h-[320px] lg:min-h-0 lg:h-auto w-full lg:w-1/2">
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[60vh] xl:min-h-[70vh] flex items-center justify-center overflow-hidden">
            {SLIDER_IMAGES.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Billiard Table ${idx + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-700
                  ${idx === current ? 'opacity-100 translate-x-0 z-10' : direction === 1 && idx === (current - 1 + total) % total ? '-translate-x-1/3 opacity-0 z-0' : direction === -1 && idx === (current + 1) % total ? 'translate-x-1/3 opacity-0 z-0' : 'opacity-0'}
                `}
                style={{transitionProperty: 'opacity, transform'}}
              />
            ))}
            {/* Prev/Next buttons */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full z-20"
              aria-label="Previous"
            >
              <FiChevronLeft className="text-2xl" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full z-20"
              aria-label="Next"
            >
              <FiChevronRight className="text-2xl" />
            </button>
            {/* Carousel dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {SLIDER_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${current === idx ? 'bg-white/90 scale-110' : 'bg-white/40'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT IMAGES SECTION */}
      <div className="max-w-7xl mx-auto w-full px-4 py-12 flex flex-col gap-10 relative z-10">
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-8">
          {PRODUCT_IMAGES.map((src, i) => (
            <div key={i} className="w-96 h-72 bg-gray-600 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg">
              <img
                src={src}
                alt={`Product ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto w-full px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white tracking-widest mb-2 drop-shadow-lg relative">
          FEATURED PRODUCTS
          <span className="block w-24 h-1 bg-[#e0d6ce] mx-auto mt-3 rounded-full shadow-lg"></span>
        </h2>
        <p className="text-center text-[#e0d6ce] text-lg mb-10 mt-2">Discover our premium billiard accessories and services</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED.map((item, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden shadow-lg group bg-black/40 border border-white/10">
              <img src={item.image} alt={item.title} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500" />
              {/* Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
                <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">{item.title}</h3>
                <p className="text-[#e0d6ce] text-sm mb-3">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="bg-black/60 text-[#e0d6ce] px-3 py-1 rounded-full text-xs font-semibold border border-[#e0d6ce]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST-SELLING DESIGNS SECTION */}
      <section className="max-w-7xl mx-auto w-full px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white tracking-widest mb-2 drop-shadow-lg relative flex flex-col items-center">
          BEST-SELLING DESIGNS <FaCrown className="inline-block text-[#e0d6ce] ml-2 mb-1 text-2xl" />
          <span className="block w-24 h-1 bg-[#e0d6ce] mx-auto mt-3 rounded-full shadow-lg"></span>
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-end gap-6 mt-10">
          {BEST_SELLING.map((item, idx) => (
            <div key={idx} className={`flex flex-col items-center w-full sm:w-1/3 max-w-xs`}>
              <div className={`relative ${item.imgClass} bg-black/40 rounded-2xl border-4 flex items-center justify-center`} style={{ borderColor: item.borderColor }}>
                <img src={item.image} alt={`Best selling ${item.rank}`} className="w-full h-full object-cover rounded-2xl" />
                {/* Crown icon */}
                <FaCrown
                  className="absolute left-4 top-4 text-3xl drop-shadow-lg"
                  style={{ color: item.crownColor }}
                />
              </div>
              {/* Rank number */}
              <div className={`w-14 h-14 flex items-center justify-center rounded-full bg-blue-800 text-white text-2xl font-bold mt-2 mb-2 shadow-lg border-4`} style={{ borderColor: item.borderColor }}>{item.rank}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
