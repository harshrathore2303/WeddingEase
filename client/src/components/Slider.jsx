import React, { useState, useEffect } from "react";

const Slider = ({slides, label}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={label == "home" ? "md:my-8 px-4 relative group md:h-[580px] w-full h-[210px]": "md:my-4 px-2 relative group md:h-[410px] w-[700px] h-[210px]"} >
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>

      {/* Left Arrow */}
      <div
        className="absolute top-1/2 left-5 transform -translate-y-1/2 text-2xl bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/40 hidden group-hover:block"
        onClick={prevSlide}
      >
        ❮
      </div>

      {/* Right Arrow */}
      <div
        className="absolute top-1/2 right-5 transform -translate-y-1/2 text-2xl bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/40 hidden group-hover:block"
        onClick={nextSlide}
      >
        ❯
      </div>

      {/* Dots*/}
      <div className="flex justify-center items-center mt-4 space-x-3">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-[#323232]" : "border border-[#323232] bg-[#AEAEAE]"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;