import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Users, Settings, LogOut, Menu, X } from "lucide-react";

function Sidenav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => navigate("/");
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="bg-blue-900 text-white flex items-center justify-between px-5 py-3 md:hidden">
        <h1 className="text-xl font-semibold">じぶんLABO by Mirabo</h1>
        <button onClick={toggleMenu} className="cursor-pointer">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-60 bg-blue-900 text-white flex flex-col justify-between shadow-lg transform transition-transform duration-300 z-40
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
              className="flex items-center gap-3 px-5 py-2 hover:bg-blue-700 transition-colors cursor-pointer"
              onClick={() => {
                navigate("/home");
                setIsOpen(false);
              }}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </button>

            <button
              className="flex items-center gap-3 px-5 py-2 hover:bg-blue-700 transition-colors cursor-pointer"
              onClick={() => {
                navigate("/users");
                setIsOpen(false);
              }}
            >
              <Users size={20} />
              <span>User List</span>
            </button>

            <button
              className="flex items-center gap-3 px-5 py-2 hover:bg-blue-700 transition-colors cursor-pointer"
              onClick={() => {
                navigate("/settings");
                setIsOpen(false);
              }}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        <div className="p-5 border-t border-blue-700">
          <button
            className="flex items-center gap-3 w-full px-3 py-2 hover:bg-blue-700 transition-colors text-left cursor-pointer"
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