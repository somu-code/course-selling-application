import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

export default function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();
  return (
    user ?
      <Outlet /> : <Navigate to={"signin"} state={{ from: location }} replace />
  )
}
