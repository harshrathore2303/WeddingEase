import React, { useState, useEffect } from "react";
import Slider from "../Slider/Slider";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useServiceStore } from "../../store/UseServiceStore";
import useBookingStore from "../../store/useBookingStore";
import useNotificationStore from "../../store/useNotificationStore";
import { useAuthStore } from "../../store/UseAuthStore";
import { LuLoader } from "react-icons/lu";

const ShowDetails = () => {
  const navigate = useNavigate();
  const { getServiceById, isLoading, service } = useServiceStore();
  const { bookService, conflicts, getConflicts, isBooking } = useBookingStore();
  const { countNotifications } = useNotificationStore();
  const { id } = useParams();
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  const handleBooking = async () => {
    if (!authUser) {
      navigate("/login");
      return;
    }
    if (!date || !Array.isArray(date) || date.length !== 2) {
      return alert("Please select a date range.");
    }

    let startDate = date[0];
    let endDate = date[1];

    if (date[0] > date[1]) {
      startDate = date[1];
      endDate = date[0];
    }

    await bookService({
      serviceId: id,
      startDate: startDate,
      endDate: endDate,
      purpose: "General booking",
    });
    await countNotifications();
    navigate(`/confirmed?start=${date[0]}&end=${date[1]}`);
  };

  const isDateConflict = ({ date }) => {
    return conflicts.some(({ startDate, endDate }) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return date >= start && date <= end;
    });
  };

  useEffect(() => {
    getServiceById(id);
    getConflicts(id);
  }, [id]);

  const [mark, setMark] = useState(false);
  const [date, setDate] = useState(null);

  if (isLoading || !service) return <Loading />;

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-32 py-8 font-serif">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <Slider slides={service.imageSet} />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                {service.title}
              </h2>
              <div className="text-sm sm:text-base font-medium text-yellow-500">
                {service.rating} ★
              </div>
            </div>

            <div className="text-sm sm:text-base text-gray-600">
              {service.location}
            </div>
            <div className="text-base sm:text-lg font-semibold mt-1 mb-4">
              ₹{service.price}
            </div>

            <div className="">
              <p className="text-sm font-medium mb-2">Available Dates</p>
              <Calendar
                minDate={new Date()}
                value={date}
                onChange={(s) => setDate(s)}
                selectRange={true}
                tileDisabled={isDateConflict}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={handleBooking}
              className="bg-base-but hover:bg-base-butHover text-white w-full sm:w-auto px-6 py-2 rounded-md text-sm font-semibold transition"
            >
              {isBooking ? (
                <>
                  <LuLoader className="h-5 w-5 animate-spin" />
                </>
              ) : (
                "Book Now"
              )}
            </button>
            <button
              onClick={() => setMark((prev) => !prev)}
              className="self-center sm:self-auto"
            >
              {mark ? (
                <FaBookmark size={26} className="text-black" />
              ) : (
                <FaRegBookmark size={26} className="text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-base sm:text-lg font-semibold mb-2">Description</h3>
        <p className="text-sm sm:text-base leading-relaxed text-gray-700 text-justify">
          {service.description ||
            `No description provided yet. This section typically includes a short summary of what the service offers, policies, and availability details.`}
        </p>
      </div>
    </div>
  );
};

export default ShowDetails;
