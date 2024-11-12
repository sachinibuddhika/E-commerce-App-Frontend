import React from "react";
import AppBarComponent from "./AppBarComponent";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <AppBarComponent />
      <main style={{ paddingTop: 64 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
