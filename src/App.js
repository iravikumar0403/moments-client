import { Navbar, Toast } from "components";
import { routes } from "config/routes";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { loginFromLocal } from "redux/features/userSlice";

const App = () => {
  const routesEl = useRoutes(routes);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        try {
          const { exp } = jwtDecode(user?.token);
          if (exp * 1000 > Date.now()) {
            dispatch(loginFromLocal(user));
          }
        } catch (error) {}
      }
    }
    return () => {};
  }, [dispatch, user]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-slate-200">
      <Navbar />
      {routesEl}
      <Toast />
    </div>
  );
};

export default App;
