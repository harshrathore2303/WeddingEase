import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";

const Events = ({ events, onDeleteEvent }) => {

    const handleDelete = () => {
        console.log('Delete event');
    }
    return (
        <div className='flex w-[30%] border-2 border-gray-500 rounded-md mt-2 flex-col text-[#333333] h-full bg-[#D8BFD8] overflow-y-auto no-scrollbar'>
            <table className='w-[100%] table-fixed sticky top-0 bg-[#D8BFD8]'>
                <tr>
                    <th className='w-[80%] font-bold text-xl py-5'>Events</th>
                </tr>
            </table>
            {
                events.map((event) => {
                    return (
                        <div className='bg-[#F5F5F5] rounded-lg w-full my-1'>
                            <table className='w-[100%] table-fixed '>
                                <tr className='h-16 flex px-6'>
                                    <td className='font-medium flex justify-between items-center w-full'>
                                        <p>{event.event_title}</p>
                                        <FaRegTrashAlt size={20} onClick={() => onDeleteEvent(event._id)}/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    );
                })
            }

        </div>
    )
}

export default Events