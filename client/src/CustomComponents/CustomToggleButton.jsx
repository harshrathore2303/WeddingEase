import React, { useState } from "react";

const ToggleButton = ({ buttons, setActiveTab }) => {
  const [active, setActive] = useState(buttons[0].label);

  const handleButtonClick = (label) => {
    setActive(label);
    setActiveTab(label);
  };

  return (
    <div className="sticky top-[72px] z-10 flex justify-center overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center sm:rounded-full rounded-xl shadow-md bg-white border-2 border-black">
        {buttons.map((button) => (
          <button
            className={`flex items-center justify-center px-2 py-2 sm:rounded-full rounded-xl text-lg font-semibold sm:w-40 w-full transition ${
              active === button.label ? "bg-base-but text-white" : "bg-white"
            }`}
            onClick={() => handleButtonClick(button.label)}
            key={button.label}
          >
            {button.icon && <button.icon size={30} className="" />}
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleButton;
