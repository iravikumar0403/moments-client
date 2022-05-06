import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = () => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  if (user) return <Outlet />;
  return <Navigate to="/login" state={{ from: location }} />;
};
