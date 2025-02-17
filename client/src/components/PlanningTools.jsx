import React, { useState } from 'react'
import ToggleButton from '../CustomComponents/CustomToggleButton'
import { MdCalculate } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { RiGroupFill } from "react-icons/ri";
import BudgetManagement from './BudgetTracker/BudgetManagement';
import ExpenseTrack from './BudgetTracker/ExpenseTrack';
import Recommendation from './BudgetTracker/Recommendation';
import GuestList from './GuestList/GuestList';
import CheckList from './CheckList/CheckList';

const PlanningTools = () => {
    const [activeTab, setActiveTab] = useState("Budget");
    const [totalGuest, setTotalGuest] = useState(0);
    const buttonData = [
        { label: "Budget", icon: MdCalculate, isOpen: false },
        { label: "GuestList", icon: RiGroupFill, isOpen: false },
        { label: "CheckList", icon: GoChecklist, isOpen: false },
    ];
    return (
        <div>
            <div className='p-4 flex flex-col min-h-screen'>
                <ToggleButton buttons={buttonData} setActiveTab={setActiveTab} />

                {/* div for budget tracking */}
                {
                    activeTab === "Budget" && (
                        <div className="flex justify-between mt-4 w-full gap-4">
                            <div className="flex-1 p-4">
                                <BudgetManagement />
                            </div>
                            <div className="flex-1 p-4">
                                <ExpenseTrack />
                            </div>
                            <div className="flex-1 p-4">
                                <Recommendation />
                            </div>
                        </div>
                    )
                }



                {/* div for guest list */}
                {
                    activeTab == "GuestList" && <div >
                        <GuestList setTotalGuest={setTotalGuest} />
                    </div>
                }

                {/* div for checklist */}
                {
                    activeTab == "CheckList" && <div>
                        <CheckList />
                    </div>
                }
            </div>
        </div>

    )
}

export default PlanningTools