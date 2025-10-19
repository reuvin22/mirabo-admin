import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import TotalInfo from "./pages/TotalInfo";
import CsvUpload from "./pages/CsvUpload";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import PublicRoutes from "./components/PublicRoutes";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Users />} />
            <Route path="/management" element={<UserManagement />} />
            <Route path="/total-info" element={<TotalInfo />} />
            <Route path="/csv-upload" element={<CsvUpload />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
