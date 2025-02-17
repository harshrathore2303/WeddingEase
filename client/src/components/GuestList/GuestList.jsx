import React, { useState, useEffect } from 'react';
import AddGroup from './AddGroup';
import AddGuest from './AddGuest';
import AddEvent from './AddEvent';
import List from './List';
import Events from './Events';
import { IoIosAddCircleOutline } from "react-icons/io";

const GuestList = ({ setTotalGuest }) => {
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchGroups();
    fetchEvents();
  }, []);

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/guestlists', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }
      const data = await response.json();
      setGroups(data);
      updateTotalGuests(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
      showAlert('Failed to fetch groups', 'error');
    }
  };

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      showAlert('Failed to fetch events', 'error');
    }
  };

  const addGroup = async (title) => {
    if (groups.some(group => group.title.toLowerCase() === title.toLowerCase())) {
      showAlert('A group with this name already exists', 'error');
      return false;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/guestlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title })
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      const newGroup = await response.json();
      setGroups([...groups, newGroup]);
      updateTotalGuests([...groups, newGroup]);
      showAlert('Group added successfully', 'success');
      return true;
    } catch (error) {
      console.error('Error creating group:', error);
      showAlert('Failed to create group', 'error');
      return false;
    }
  };

  const deleteGroup = async (groupId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/guestlists/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete group');
      }
      const updatedGroups = groups.filter(group => group._id !== groupId);
      setGroups(updatedGroups);
      updateTotalGuests(updatedGroups);
      showAlert('Group deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting group:', error);
      showAlert('Failed to delete group', 'error');
    }
  };

  const addGuest = async (guestData, groupId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/guestlists/${groupId}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(guestData)
      });

      if (!response.ok) {
        throw new Error('Failed to add guest');
      }

      await fetchGroups(); // Refresh the groups data
      showAlert('Guest added successfully', 'success');
      return true;
    } catch (error) {
      console.error('Error adding guest:', error);
      showAlert('Failed to add guest', 'error');
      return false;
    }
  };

  const deleteGuest = async (groupId, guestId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/guestlists/${groupId}/guests/${guestId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete guest');
      }
      await fetchGroups(); // Refresh the groups data
      showAlert('Guest deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting guest:', error);
      showAlert('Failed to delete guest', 'error');
    }
  };

  const addEvent = async (eventTitle) => {
    if (events.some(event => event.event_title.toLowerCase() === eventTitle.toLowerCase())) {
      showAlert('An event with this name already exists', 'error');
      return false;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ event_title: eventTitle })
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      await fetchEvents(); // Refresh the events data
      showAlert('Event added successfully', 'success');
      return true;
    } catch (error) {
      console.error('Error creating event:', error);
      showAlert('Failed to create event', 'error');
      return false;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      const updatedEvents = events.filter(event => event._id !== eventId);
      setEvents(updatedEvents);
      showAlert('Event deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting event:', error);
      showAlert('Failed to delete event', 'error');
    }
  };

  const updateTotalGuests = (groupsData) => {
    const total = groupsData.reduce((acc, group) => acc + (group.guests ? group.guests.length : 0), 0);
    setTotalGuest(total);
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <div className="container">
      {alert.show && (
        <div className={`alert ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white p-2 mb-4 rounded`}>
          {alert.message}
        </div>
      )}
      <div className='buttonContainer gap-4 flex'>
        <button className="flex flex-row items-center justify-center text-[#AD563B] transition duration-200 hover:scale-105 font-bold p-2 " onClick={() => setIsGroupOpen(true)}>
          <IoIosAddCircleOutline size={20} className='mx-1' />
          Add Group
        </button>
        <button className="flex flex-row items-center justify-center text-[#AD563B] transition duration-200 hover:scale-105 font-bold p-2 " onClick={() => setIsGuestOpen(true)}>
          <IoIosAddCircleOutline size={20} className='mx-1' />
          Add Guest
        </button>
        <button className="flex flex-row items-center justify-center text-[#AD563B] transition duration-200 hover:scale-105 font-bold p-2 " onClick={() => setIsEventOpen(true)}>
          <IoIosAddCircleOutline size={20} className='mx-1' />
          Add Event
        </button>
      </div>

      {isGroupOpen && <AddGroup setIsGroupOpen={setIsGroupOpen} addGroup={addGroup} />}
      {isGuestOpen && <AddGuest setIsGuestOpen={setIsGuestOpen} groups={groups} events={events} addGuest={addGuest} />}
      {isEventOpen && <AddEvent setIsEventOpen={setIsEventOpen} addEvent={addEvent} />}

      <div className='flex gap-2'>
        <List data={groups} onDeleteGroup={deleteGroup} onDeleteGuest={deleteGuest} />
        <Events events={events} onDeleteEvent={deleteEvent} />
      </div>
    </div>
  );
};

export default GuestList;

