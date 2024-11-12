import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function BreadcrumbsComponent() {
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = pathParts.map((part, index) => {
    const path = `/${pathParts.slice(0, index + 1).join("/")}`;

    return (
      <Typography key={path} color="textPrimary">
        {part.charAt(0).toUpperCase() + part.slice(1)}{" "}
      </Typography>
    );
  });

  return (
    <div style={{ margin: "10px 0" }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
}

export default BreadcrumbsComponent;
