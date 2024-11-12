import React from "react";
import AppBarComponent from "./AppBarComponent";
import { Outlet } from "react-router-dom";
import BreadcrumbsComponent from "./BreadcrumbsComponent";

function Layout() {
  return (
    <div>
      <AppBarComponent />
      <main
        style={{
          paddingTop: 10,
          padding: "30px",
          marginTop: "20px",
          marginBottom: "50px",
          marginLeft: "250px",
          marginRight: "250px",
        }}
      >
        <BreadcrumbsComponent />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
