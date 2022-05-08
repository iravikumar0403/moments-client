import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "hooks/selectors";

export const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();
  if (user) return <Outlet />;
  return <Navigate to="/login" state={{ from: location }} />;
};
