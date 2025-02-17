import React, { useState } from 'react'

const ToggleButton = ({buttons, setActiveTab}) => {
    const [active, setActive] = useState(buttons[0].label);

    const handleButtonClick = (label) => {
        setActive(label);
        setActiveTab(label); // to update the active tab
    };
    
    return (
        <div className="sticky top-[72px] z-10">
            <div className="flex justify-center">
                <div className="inline-flex items-center rounded-full shadow-md bg-white border-2 border-gray-300">
                    {
                        buttons.map((button)=>(
                            <button
                        className={`flex items-center justify-center px-2 py-2 rounded-full focus:outline-none text-[#333333] text-lg font-semibold w-40 transition ${active === button.label ? "bg-blue-500 text-white" : "bg-white"
                            }` }
                        onClick={() => handleButtonClick(button.label)}
                        key={button.label}
                    >
                        {button.icon && <button.icon size={30} className=''/>}
                        {button.label}
                    </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ToggleButton