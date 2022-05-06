import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { BsPlusCircle } from "react-icons/bs";
import { MdExplore } from "react-icons/md";
import { FaBell, FaUserCircle } from "react-icons/fa";

export const BottomNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 w-full text-slate-900 bg-slate-100 dark:text-slate-100 dark:bg-gray-800 lg:hidden">
      <div className="max-w-3xl flex justify-between items-center mx-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "px-2 text-teal-500" : "px-2"
          }
        >
          <HiHome size={25} />
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            isActive ? "px-2 text-teal-500" : "px-2"
          }
        >
          <MdExplore size={25} />
        </NavLink>
        <button to="/" className="px-2">
          <BsPlusCircle size={35} />
        </button>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            isActive ? "px-2 text-teal-500" : "px-2"
          }
        >
          <FaBell size={25} />
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "px-2 text-teal-500" : "px-2"
          }
        >
          <FaUserCircle size={25} />
        </NavLink>
      </div>
    </div>
  );
};
