import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  let isAuthenticated = false;
  const cookie = document.cookie.split("=");
  if (cookie[0] === "loggedIn" && cookie[1] === "true") {
    isAuthenticated = true;
  }
  const location = useLocation();

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/signin" />;
}

export default RequireAuth;
