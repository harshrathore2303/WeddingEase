import React, { useState } from "react";
import ToggleButton from "../../CustomComponents/CustomToggleButton";
import { MdCalculate } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { RiGroupFill } from "react-icons/ri";
import BudgetManagement from "../BudgetTracker/BudgetManagement";
import ExpenseTrack from "../BudgetTracker/ExpenseTrack";
import Suggestions from "../BudgetTracker/Suggestions";
import GuestList from "../GuestList/GuestList";
import CheckList from "../CheckList/CheckList";
import { FaTools } from "react-icons/fa";
import { useGuestStore } from "../../store/UseGuestStore";

const PlanningTools = () => {
  const { guests } = useGuestStore();
  const [activeTab, setActiveTab] = useState("Budget");
  const [totalGuest, setTotalGuest] = useState(0);

  const buttonData = [
    { label: "Budget", icon: MdCalculate },
    { label: "GuestList", icon: RiGroupFill },
    { label: "CheckList", icon: GoChecklist },
  ];

  return (
    <div className="min-h-screen w-full px-4 md:px-16 lg:px-36 py-8 font-serif text-[#3e3c1b] bg-[#fdfcf4]">
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-2 text-4xl font-bold text-[#3e3c1b]">
          <FaTools />
          <h1>Planning Tools</h1>
        </div>
        <p className="mt-2 text-md text-[#5c5c3d]">
          Everything you need to organize your dream wedding in one place
        </p>
      </div>
      <div className="mb-8 flex justify-center">
        <ToggleButton buttons={buttonData} setActiveTab={setActiveTab} />
      </div>

      {activeTab === "Budget" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#e0ddc5]">
            <BudgetManagement />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#e0ddc5]">
            <ExpenseTrack />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#e0ddc5]">
            <Suggestions />
          </div>
        </div>
      )}

      {activeTab === "GuestList" && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-[#e0ddc5]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Guest List Manager</h2>
            <span className="text-sm text-gray-600">
              Total Guests:{" "}
              <strong>
                {guests.reduce(
                  (acc, group) => acc + (group.guests?.length || 0),
                  0
                )}
              </strong>
            </span>
          </div>
          <GuestList />
        </div>
      )}

      {activeTab === "CheckList" && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-[#e0ddc5]">
          <h2 className="text-xl font-semibold mb-4">Pre-Wedding Checklist</h2>
          <CheckList />
        </div>
      )}
    </div>
  );
};

export default PlanningTools;
