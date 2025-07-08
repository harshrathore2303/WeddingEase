import React, { useState } from 'react';
import ToggleButton from '../../CustomComponents/CustomToggleButton';
import { MdCalculate } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { RiGroupFill } from "react-icons/ri";
import BudgetManagement from '../BudgetTracker/BudgetManagement';
import ExpenseTrack from '../BudgetTracker/ExpenseTrack';
import Suggestions from '../BudgetTracker/Suggestions';
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
    <div className="min-h-full max-w-full px-4 md:px-16 lg:px-36 py-6 font-serif">
      <h1 className="text-3xl font-bold text-center mb-6">Planning Tools</h1>

      <div className="mb-6 text-center">
        <ToggleButton buttons={buttonData} setActiveTab={setActiveTab} />
      </div>

      {activeTab === "Budget" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <BudgetManagement />

            <ExpenseTrack />

            <Suggestions />
        </div>
      )}

      {activeTab === "GuestList" && (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <GuestList setTotalGuest={setTotalGuest} />
        </div>
      )}

      {activeTab === "CheckList" && (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <CheckList />
        </div>
      )}
    </div>
  );
};

export default PlanningTools;
