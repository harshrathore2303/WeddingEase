import React from 'react';

const Suggestions = () => {
  return (
    <div className="w-full bg-[#fdfcf4] border border-[#dad8c7] rounded-xl shadow-md font-serif flex flex-col">
      <div className="bg-[#dadce6] text-[#AD563B] font-semibold text-center py-2 rounded-t-xl">
        Suggestions For You
      </div>

      <div className="p-4 space-y-3 flex-grow">
        <div className="w-full text-left bg-white border border-[#e4e4d9] rounded-lg px-3 py-2 text-[#3e3c1b] text-sm font-medium">
          Consider allocating more for Catering if guest count &gt; 100.
        </div>

        <div className="w-full text-left bg-white border border-[#e4e4d9] rounded-lg px-3 py-2 text-[#3e3c1b] text-sm font-medium">
          Photographers often get booked early – reserve soon!
        </div>

        <div className="w-full text-left bg-white border border-[#e4e4d9] rounded-lg px-3 py-2 text-[#3e3c1b] text-sm font-medium">
          Transport vendors can help guests arrive on time.
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
