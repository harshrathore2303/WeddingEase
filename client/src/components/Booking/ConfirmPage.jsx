import React from "react";
import { useSearchParams } from "react-router-dom";

const ConfirmPage = () => {
  const [searchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  return (
    <div className="bg-amber-50 px-4 pt-5 pb-4 h-screen font-serif">
      <div className="bg-white border border-amber-200 shadow-lg rounded-2xl max-w-md mx-auto p-8">
        <h1 className="text-2xl font-semibold text-amber-700 mb-4 text-center">
          Booking Confirmed! 🎉
        </h1>

        <p className="text-base text-gray-700 text-center">
          Thank you for choosing us.
        </p>

        <div className="bg-amber-100 border border-amber-300 rounded-lg p-4 mt-6">
          <p className="mb-2">
            <span className="font-semibold text-amber-800">Start Date:</span>{" "}
            <em>{start}</em>
          </p>
          <p>
            <span className="font-semibold text-amber-800">End Date:</span>{" "}
            <em>{end}</em>
          </p>
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          We look forward to making your experience memorable!
        </p>
      </div>
    </div>
  );
};

export default ConfirmPage;
