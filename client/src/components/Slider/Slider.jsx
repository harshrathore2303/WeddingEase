import React, { useState } from "react";

const Slider = ({ slides = [], label }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div
      className={`relative group rounded-xl overflow-hidden ${
        label === "home" ? "md:my-8 px-4 relative group md:h-[580px] w-full h-[210px]" : "aspect-[4/3] md:aspect-[16/10]"
      } w-full`}
    >
      {/* Image */}
      <img
        src={slides[currentIndex]}
        loading="lazy"
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover transition duration-500"
      />

      {/* Left Arrow */}
      <div
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-2xl bg-white/30 p-2 rounded-full cursor-pointer hover:bg-white/50 hidden group-hover:block"
      >
        ❮
      </div>

      {/* Right Arrow */}
      <div
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-2xl bg-white/30 p-2 rounded-full cursor-pointer hover:bg-white/50 hidden group-hover:block"
      >
        ❯
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-2 h-2 rounded-full ${
              index === currentIndex
                ? "bg-[#323232]"
                : "border border-[#323232] bg-[#AEAEAE]"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
