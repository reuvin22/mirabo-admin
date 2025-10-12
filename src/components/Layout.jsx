import React from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "./Sidenav";

function Layout() {
  return (
    <div className="relative min-h-screen bg-gray-50 md:flex">
      {/* Sidebar (fixed) */}
      <Sidenav />

      {/* Main content */}
      <main className="flex-1 p-5 md:ml-60">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
