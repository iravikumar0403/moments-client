import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

export const PostOptions = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative">
      <button
        className="mx-2 p-3 rounded-full hover:bg-teal-50 hover:text-teal-600"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <FiMoreHorizontal size={"1.2rem"} />
      </button>
      {showDropdown && (
        <div className="absolute right-0 mx-2 bg-slate-600 px-4 py-2 rounded min-w-max w-32">
          <button className="w-full py-1 rounded hover:bg-teal-50 hover:text-teal-500">
            Edit
          </button>
          <button className="w-full py-1 rounded hover:bg-teal-50 hover:text-teal-500">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
