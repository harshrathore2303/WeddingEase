import React, { useState } from 'react';
import ToggleButton from '../../CustomComponents/CustomToggleButton';
import { MdCalculate } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { RiGroupFill } from "react-icons/ri";
import BudgetManagement from '../BudgetTracker/BudgetManagement';
import ExpenseTrack from '../BudgetTracker/ExpenseTrack';
import Recommendation from '../BudgetTracker/Recommendation';
import GuestList from '../GuestList/GuestList';
import CheckList from '../CheckList/CheckList';

const PlanningTools = () => {
  const [activeTab, setActiveTab] = useState("Budget");
  const [totalGuest, setTotalGuest] = useState(0);

  const buttonData = [
    { label: "Budget", icon: MdCalculate },
    { label: "GuestList", icon: RiGroupFill },
    { label: "CheckList", icon: GoChecklist },
  ];

  return (
    <div className="p-4 min-h-screen bg-white font-serif max-w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-[#3e3c1b] text-center">Planning Tools</h2>

      <div className="mb-6 flex justify-center">
        <ToggleButton buttons={buttonData} setActiveTab={setActiveTab} />
      </div>

      {/* Budget Section */}
      {activeTab === "Budget" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="bg-white p-5 rounded-xl shadow border border-gray-200 flex justify-center">
            <BudgetManagement />
          </div>
          <div className="bg-white p-5 rounded-xl shadow border border-gray-200 flex justify-center">
            <ExpenseTrack />
          </div>
          <div className="bg-white p-5 rounded-xl shadow border border-gray-200 flex justify-center">
            <Recommendation />
          </div>
        </div>
      )}

      {/* Guest List Section */}
      {activeTab === "GuestList" && (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <GuestList setTotalGuest={setTotalGuest} />
        </div>
      )}

      {/* Checklist Section */}
      {activeTab === "CheckList" && (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <CheckList />
        </div>
      )}
    </div>
  );
};

export default PlanningTools;
