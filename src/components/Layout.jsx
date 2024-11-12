import React from "react";
import AppBarComponent from "./AppBarComponent";
import { Outlet } from "react-router-dom";
import BreadcrumbsComponent from "./BreadcrumbsComponent";

function Layout() {
  return (
    <div>
      <AppBarComponent />
      <main style={{ paddingTop: 64 }}>
        <BreadcrumbsComponent />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
