import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminAuthenticatedState } from "../store/selectors/isAdminAuthenticated";

function RequireAuth() {
  const isAuthenticated = useRecoilValue(adminAuthenticatedState);
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/signin" state={{ from: location }} replace />
  );
}

export default RequireAuth;
