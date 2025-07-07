import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import Card from "./Card";
import { useServiceStore } from "../../store/UseServiceStore";
import { useSearchParams } from "react-router-dom";

const options = [
  "Hall",
  "Photographer",
  "Caterer",
  "Decorator",
  "Musician",
  "Dj",
  "Makeup Artist",
  "Mehendi Artist",
  "Planner",
  "Transporter",
  "Others",
];

const locations = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Jaipur",
  "Ahmedabad",
  "Pune",
  "Lucknow",
  "Indore",
  "Chandigarh",
  "Bhopal",
  "Goa",
  "Udaipur",
  "Nagpur",
  "Agra",
  "Varanasi",
  "Amritsar",
  "Surat",
];

const MainPage = () => {
  const { fetchServices, isLoading, services, page, totalPages } =
    useServiceStore();
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [location, setLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = () => {
    const params = {};

    if (tag) params.tag = tag;
    if (location) params.location = location;
    if (search) params.search = search;
    params.page = 1;

    setCurrentPage(1);
    setSearchParams(params);
    fetchServices(params);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = {};
    if (tag) params.tag = tag;
    if (location) params.location = location;
    if (search) params.search = search;
    params.page = newPage;

    setCurrentPage(newPage);
    setSearchParams(params);
  };

  useEffect(() => {
    const tagParam = searchParams.get("tag") || "";
    const locationParam = searchParams.get("location") || "";
    const searchParam = searchParams.get("search") || "";
    const pageParam = parseInt(searchParams.get("page")) || 1;

    setTag(tagParam);
    setLocation(locationParam);
    setSearch(searchParam);
    setCurrentPage(pageParam);

    fetchServices({
      tag: tagParam,
      location: locationParam,
      search: searchParam,
      page: pageParam,
    });
  }, [searchParams]);

  return (
    <div className="px-4 md:px-16 lg:px-36 py-6 font-serif">
      <h1 className="text-3xl font-bold text-center mb-6">
        Find the Best Wedding Services
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="flex items-center border-2 rounded-xl px-3 py-2 w-full md:w-64">
            <FaSearch className="mr-2 text-gray-600" />
            <input
              type="text"
              placeholder="Search services"
              className="w-full outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="border-2 rounded-xl px-4 py-2 text-sm"
          >
            <option value="">All Categories</option>
            {options.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-2 rounded-xl px-4 py-2 text-sm"
          >
            <option value="">All Locations</option>
            {locations.map((location, idx) => (
              <option key={idx} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <button
          className="flex items-center gap-2 border-2 px-4 py-2 rounded-xl font-semibold border-gray-700 hover:bg-gray-100"
          onClick={handleFilter}
        >
          <FaFilter />
          Apply Search
        </button>
      </div>

      {isLoading ? (
        <div className="text-center w-full py-10">Loading services...</div>
      ) : services?.length === 0 ? (
        <div className="text-center w-full py-10">No services found</div>
      ) : (
        <section className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {services.map((item) => (
              <Card key={item._id} detail={item} id={item._id} />
            ))}
          </div>
        </section>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="px-4 py-1 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
