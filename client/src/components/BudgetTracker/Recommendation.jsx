import React from 'react';

const Recommendation = () => {
  return (
    <div>
      <div className="w-[350px] bg-[#f4f4ff] border border-black rounded-xl shadow-md font-serif">
        {/* Header */}
        <div className="bg-[#DADAE6] text-[#AD563B] font-semibold text-center py-2 rounded-t-xl shadow">
          Suggestions For You
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <button className="w-full text-left bg-white hover:bg-[#f2f2f2] transition duration-200 border border-gray-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md text-[#3e3c1b] font-medium">
            Consider allocating more for Catering if guest count &gt; 100.
          </button>

          <button className="w-full text-left bg-white hover:bg-[#f2f2f2] transition duration-200 border border-gray-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md text-[#3e3c1b] font-medium">
            Photographers often get booked early – reserve soon!
          </button>

          <button className="w-full text-left bg-white hover:bg-[#f2f2f2] transition duration-200 border border-gray-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md text-[#3e3c1b] font-medium">
            Transport vendors can help guests arrive on time.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
