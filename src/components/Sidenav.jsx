import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  BarChart3,
  FileUp,
  LogOut,
  Menu,
  X,
  User
} from "lucide-react";

import { useDispatch } from "react-redux";
import { logout } from "../utils/reducers/authSlice"

function Sidenav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  
  return (
    <>
      <div className="bg-gray-800 text-white flex items-center justify-between px-5 py-3 md:hidden">
        <h1 className="text-xl font-semibold">じぶんLABO by Mirabo</h1>
        <button onClick={toggleMenu} className="cursor-pointer">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-60 bg-gray-800 text-white flex flex-col justify-between shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div>
          <div className="p-5 border-b border-blue-700 text-center">
            <h1 className="text-2xl font-semibold tracking-wide">
              じぶんLABO by Mirabo
            </h1>
          </div>

          <nav className="mt-4 flex flex-col space-y-1">
            <button
              className="flex items-center gap-3 px-5 py-2 hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => {
                navigate("/dashboard");
                setIsOpen(false);
              }}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </button>

            <button
              className="flex items-center gap-3 px-5 py-2 hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
            >
              <User size={20} />
              <span>Profile</span>
            </button>

            <button
              className="flex items-center gap-3 px-5 py-2 hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => {
                navigate("/management");
                setIsOpen(false);
              }}
            >
              <Users size={20} />
              <span>User Management</span>
            </button>

            <button
              className="flex items-center gap-3 px-5 py-2 hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => {
                navigate("/total-info");
                setIsOpen(false);
              }}
            >
              <BarChart3 size={20} />
              <span>Total Info</span>
            </button>

            <button
              className="flex items-center gap-3 px-5 py-2 hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => {
                navigate("/csv-upload");
                setIsOpen(false);
              }}
            >
              <FileUp size={20} />
              <span>CSV Upload</span>
            </button>
          </nav>
        </div>

        <div className="p-5 border-t border-blue-700">
          <button
            className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-700 transition-colors text-left cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidenav;
