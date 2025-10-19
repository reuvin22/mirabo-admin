import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoutes() {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
