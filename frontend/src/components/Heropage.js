import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LuxuryHero() {

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
    pauseOnHover: false,
  };

  const slides = [
    {
      title: "TIMELESS BEAUTY",
      tagline: "Crafted to shine for generations",
      img: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=2070",
    },
    {
      title: "LUXURY COLLECTION",
      tagline: "Elegance designed for every moment",
      img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=2070",
    },
    {
      title: "PRECIOUS MOMENTS",
      tagline: "Jewelry that tells your story",
      img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070",
    },
    {
      title: "ETERNAL SPARKLE",
      tagline: "Where craftsmanship meets passion",
      img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070",
    },
  ];

  return (
    <section className="h-[50vh] overflow-hidden bg-black text-white">

      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[50vh]">

            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">

              {/* Title Animation */}
              <motion.h1
                key={slide.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-serif tracking-wide"
              >
                {slide.title}
              </motion.h1>

              {/* Tagline Animation */}
              <motion.p
                key={slide.tagline}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-3 text-sm md:text-lg text-gray-300"
              >
                {slide.tagline}
              </motion.p>

              {/* Floating Ring */}
              <motion.img
                src="https://pngimg.com/uploads/ring/ring_PNG47.png"
                className="w-16 md:w-24 mt-4"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-5"
              >
                <Link
                  to="/products"
                  className="bg-[#d6c6a5] text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
                >
                  Explore Now →
                </Link>
              </motion.div>

            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}