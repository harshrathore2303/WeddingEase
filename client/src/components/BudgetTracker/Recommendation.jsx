import React from 'react'

const Recommendation = () => {
    return (
        <div className=''>
            <div className='w-[350px] bg-[#F4F4FF] rounded-lg shadow-lg border-gray-300 border'>
                <div className='flex justify-center bg-[#DADAE6] rounded-lg shadow-lg py-2 text-[#AD563B] font-inria font-bold'>
                    Recommendation
                </div>

                <div className='flex justify-center items-center font-inria py-2 border-t-2 border-t-gray-300 px-4'>
                    <button className='transition hover:scale-125'>Title</button>
                </div>
            </div>
        </div>
    )
}

export default Recommendation