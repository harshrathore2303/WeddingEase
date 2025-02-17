import React from 'react';

const DisplayComponent = ({
  headingText,
  buttonText,
  imageUrl,
  buttonStyles = "bg-[#8B3B2F] text-white py-2 px-6 mt-4 sm:rounded-full hover:bg-[#6f2e24]",
  backgroundStyles = "bg-[#e3d3d3] p-5 sm:p-10", 
}) => {
  return (
    <section className={`${backgroundStyles} flex flex-col-reverse items-center sm:justify-between min-h-fit`}>
      <div className="sm:w-1/2 flex flex-col sm:items-start">
        <h2 className="md:text-4xl text-lg sm:text-3xl font-semibold text-brown-800 mb-4 grow">
          {headingText}
        </h2>
        <button className={buttonStyles}>
          {buttonText}
        </button>
      </div>
      <div className="sm:w-1/2">
        <img
          src={imageUrl}
          alt="Display"
          className="sm:mt-8 md:mt-0"
        />
      </div>
    </section>
  );
};

export default DisplayComponent;
