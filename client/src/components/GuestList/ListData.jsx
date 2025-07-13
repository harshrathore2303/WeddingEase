import { FaRegTrashAlt } from "react-icons/fa";

const ListData = ({ guest, onDeleteGuest }) => {
  return (
    <tr className="h-14 border-t hover:bg-[#f9f9e6] transition">
      <td className="px-4 py-2 font-medium">{guest.name}</td>
      <td className="px-4 py-2 text-center whitespace-nowrap">{guest.phone}</td>
      <td className="px-4 py-2 text-center break-words whitespace-nowrap">{guest.email}</td>
      <td className="px-2 py-2">
        <div className="flex justify-center items-center h-full">
          <FaRegTrashAlt
            size={18}
            onClick={onDeleteGuest}
            className="cursor-pointer text-red-600 hover:text-red-800"
            title="Delete Guest"
          />
        </div>
      </td>
    </tr>
  );
};

export default ListData;
