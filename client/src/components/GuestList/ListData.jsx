import {useState} from 'react'
import { FaRegTrashAlt } from "react-icons/fa";

const ListData = ({guest, onDeleteGuest}) => {
    const [showAll, setShowAll] = useState(false);

    const handleToggle = () => {
        setShowAll(prevState => !prevState);
    };

    const displayedItems = showAll ? guest.events : guest.events.slice(0, 1);
    return (
        <table className='w-[100%] table-fixed'>
            <tbody>
                <tr className='h-16'>
                    <td className='relative left-5 w-[80%] font-medium'>{guest.name}</td>
                    <td className='text-center font-normal w-[80%]'>{guest.phone}</td>
                    <td className='text-center font-normal w-[100%] break-words'>{guest.email}</td>
                    <td className="text-center font-normal w-[100%]">
                        <div className="flex flex-wrap justify-center gap-1 items-center mt-2">
                            {displayedItems.map((event, index) => (
                                <div key={index} className="bg-[#FFB6C1] text-[#333333] px-3 py-1 rounded-md text-xs"> 
                                    {event}
                                </div>
                            ))}
                            {guest.events.length >= 2 && (
                                <button
                                    className="text-blue-500 mt-2 text-xs ml-2"     
                                    onClick={handleToggle}
                                >
                                    {showAll ? 'Hide' : '...'}
                                </button>
                            )}
                        </div>
                    </td>
                    <td className='w-[10%]'>
                        <FaRegTrashAlt 
                            size={20} 
                            onClick={onDeleteGuest}
                            className="cursor-pointer"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default ListData

