import React, { useState } from 'react';

const AddGuest = ({ setIsGuestOpen, groups, events, addGuest }) => {
  const [guestName, setGuestName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleCheck = (event) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter(e => e !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const handleSave = async () => {
    if (guestName && phoneNumber && email && selectedGroup && selectedEvents.length > 0) {
      const guestData = {
        name: guestName,
        phone: phoneNumber,
        email: email,
        events: selectedEvents
      };
      await addGuest(guestData, selectedGroup);
      setIsGuestOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-lg w-[60%] min-h-[30%] flex flex-col border-[1px] border-black overflow-auto">
        <div className='flex gap-4'>
          <input 
            placeholder='guest name' 
            className="border-2 border-gray-600 rounded-md w-full mb-8 p-2"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <input 
            placeholder='phone number' 
            className="border-2 border-gray-600 rounded-md w-full mb-8 p-2"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input 
            placeholder='email' 
            className="border-2 border-gray-600 rounded-md w-full mb-8 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='flex gap-3 flex-wrap text-lg'>
          Attending:
          {events.map((event) => (
            <label key={event._id} className='flex gap-1 mb-8'>
              <input 
                type='checkbox' 
                checked={selectedEvents.includes(event.event_title)}
                onChange={() => handleCheck(event.event_title)}
              />
              {event.event_title}
            </label>
          ))}
        </div>

        <div className='flex gap-3 text-lg'>
          Group:
          <select 
            className='border-[1px] border-gray-600 w-1/6 rounded-md'
            onChange={(e) => setSelectedGroup(e.target.value)}
            value={selectedGroup}
          >
            <option value="">Select</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>{group.title}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-4 mt-auto">
          <button
            className="px-4 py-2 bg-gray-200 rounded-full"
            onClick={() => setIsGuestOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-full"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGuest;

