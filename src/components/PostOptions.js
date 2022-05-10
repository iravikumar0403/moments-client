import { useOnOutsideClick } from "hooks/useOnOutsideClick";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { showModal } from "redux/features/modalSlice";

export const PostOptions = ({ post }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { element } = useOnOutsideClick(() => setShowDropdown(false));
  const dispatch = useDispatch();
  return (
    <div className="relative" ref={element}>
      <button
        className={`mx-2 p-3 rounded-full hover:bg-teal-50 hover:text-teal-600 ${
          showDropdown ? "bg-teal-50 text-teal-600" : ""
        }`}
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <FiMoreHorizontal size={"1.2rem"} />
      </button>
      {showDropdown && (
        <div className="absolute right-0 mx-2 bg-slate-50 dark:bg-slate-600 px-4 py-2 rounded min-w-max w-32">
          <button
            className="w-full py-1 rounded hover:text-teal-500"
            onClick={() => dispatch(showModal(post))}
          >
            Edit
          </button>
          <button className="w-full py-1 rounded hover:text-teal-500">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
