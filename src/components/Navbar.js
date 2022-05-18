import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "hooks/selectors";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "redux/features/userSlice";
import { MdOutlineLogout } from "react-icons/md";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setTheme(theme);
      document.documentElement.classList.add(theme);
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  };

  const logout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="fixed w-full top-0 left-0 h-12 flex text-slate-900 bg-white dark:text-slate-100 dark:bg-gray-800">
      <div className="flex max-w-screen-xl px-4 mx-auto w-full items-center justify-between">
        <p className="font-logo text-2xl p-2 text-center">Moments</p>
        <div className="flex">
          {user && (
            <button
              className="flex px-4 items-center btn-secondary text-red-500 border-red-500 dark:border-red-500 dark:hover:border-red-500 hover:bg-red-400 hover:text-black dark:hover:bg-red-400 dark:hover:text-black"
              onClick={logout}
            >
              <MdOutlineLogout className="mr-4" />
              Logout
            </button>
          )}
          <button onClick={toggleTheme} className="p-2 mx-4">
            {theme === "dark" ? (
              <BsFillSunFill size={"1.5rem"} />
            ) : (
              <BsFillMoonFill size={"1.5rem"} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
