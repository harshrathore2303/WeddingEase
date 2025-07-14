import React, { useState, useEffect } from "react";
import AddGroup from "./AddGroup";
import AddGuest from "./AddGuest";
import List from "./List";
import { IoIosAddCircleOutline } from "react-icons/io";
import CustomButton from "../../CustomComponents/CustomButton";
import { useGuestStore } from "../../store/UseGuestStore";

const GuestList = () => {
  const { fetchGuests } = useGuestStore();

  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  useEffect(() =>{
    fetchGuests();
  }, [isGroupOpen, isGuestOpen]);

  return (
    <div className="text-[#3e3c1b]">

      <div className="flex justify-start gap-4 mb-6">
        <CustomButton
          title="Add Group"
          icon={IoIosAddCircleOutline}
          onClick={() => setIsGroupOpen(true)}
        />
        <CustomButton
          title="Add Guest"
          icon={IoIosAddCircleOutline}
          onClick={() => setIsGuestOpen(true)}
        />
      </div>

      {isGroupOpen && <AddGroup setIsGroupOpen={setIsGroupOpen} />}
      {isGuestOpen && (
        <AddGuest setIsGuestOpen={setIsGuestOpen} />
      )}

      <div className="">
          <List/>
      </div>
    </div>
  );
};

export default GuestList;
