import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  let isAuthenticated = false;
  return isAuthenticated ? <Outlet /> : <Navigate to="signin" />;
}

export default RequireAuth;
