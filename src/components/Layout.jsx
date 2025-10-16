import React from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "./Sidenav";

function Layout() {
  return (
    <div className="relative min-h-screen bg-gray-50 md:flex">
      <Sidenav />

      <main className="flex-1 md:ml-60">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
