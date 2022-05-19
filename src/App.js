import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRoutes } from "react-router-dom";
import { loginFromLocal, syncUserData } from "redux/features/userSlice";
import { FAB, Modal, Navbar, Toast } from "components";
import { useAuth } from "hooks/selectors";
import { routes } from "config/routes";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useScrollToTop } from "hooks/useScrollToTop";

const App = () => {
  useScrollToTop();
  const routesEl = useRoutes(routes);
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        try {
          const { exp } = jwtDecode(user?.token);
          if (exp * 1000 > Date.now()) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${user.token}`;
            dispatch(loginFromLocal(user));
            dispatch(syncUserData(user.username));
          }
        } catch (error) {}
      }
    }
    return () => {};
  }, [dispatch, user]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-slate-200">
      <Navbar />
      <Modal />
      {routesEl}
      <Toast />
      <FAB />
    </div>
  );
};

export default App;
