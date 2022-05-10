import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { MdExplore } from "react-icons/md";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { BsBookmarkFill } from "react-icons/bs";

export const SideNav = () => {
  const sidebarData = [
    {
      name: "Feed",
      path: "/",
      icon: <HiHome size={25} className="mx-3" />,
    },
    {
      name: "Explore",
      path: "/explore",
      icon: <MdExplore size={25} className="mx-3" />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <FaBell size={25} className="mx-3" />,
    },
    {
      name: "Bookmarks",
      path: "/bookmarks",
      icon: <BsBookmarkFill size={23} className="mx-3" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUserCircle size={25} className="mx-3" />,
    },
  ];
  return (
    <aside className="hidden md:block sticky top-[10vh] h-[85vh] bg-white rounded mt-16 mx-auto p-4 w-full max-w-[18rem] dark:bg-slate-800">
      {sidebarData.map((item) => (
        <NavLink
          to={item.path}
          key={item.path}
          className={({ isActive }) => (isActive ? "m-1 text-teal-500" : "m-1")}
        >
          <span className="flex items-center">
            {item.icon} {item.name}
          </span>
        </NavLink>
      ))}
    </aside>
  );
};
