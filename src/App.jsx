import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import TotalInfo from "./pages/TotalInfo";
import CsvUpload from "./pages/CsvUpload";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Users />} />
        <Route path="/management" element={<UserManagement />} />
        <Route path="/total-info" element={<TotalInfo />} />
        <Route path="/csv-upload" element={<CsvUpload />} />
      </Route>
    </Routes>
  );
}

export default App;
