import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const formatBreadcrumbText = (text) => {
  const formatted = text.replace(/([a-z])([A-Z])/g, "$1 $2");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
};

const breadcrumbNameMapping = {
  addProduct: "Add New Product",
  editProduct: "Edit Product",
  favorites: "Favorites",
  productDetails: "Product Details",
  searchResult: "Search Results",
};

function BreadcrumbsComponent() {
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = [
    <Typography
      key="products"
      sx={{
        fontSize: "1.5rem",
        marginLeft: "30px",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "Satoshi, sans-serif",
        color: "black",
        letterSpacing: "0.2em",
      }}
    >
      PRODUCTS
    </Typography>,
    ...pathParts.map((part, index) => {
      const path = `/${pathParts.slice(0, index + 1).join("/")}`;

      const customName = breadcrumbNameMapping[part];

      const formattedPart = customName || formatBreadcrumbText(part);

      return (
        <Link to={path} key={path} style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              fontSize: "1rem",
              textTransform: "capitalize",
              color: "#001EB9",
              marginRight: "10px",
              letterSpacing: "0.2em",
            }}
          >
            {formattedPart}
          </Typography>
        </Link>
      );
    }),
  ];

  return (
    <div style={{ margin: "10px 0" }}>
      <Breadcrumbs
        separator={
          <NavigateNextIcon
            fontSize="small"
            sx={{
              color: "#001EB9",
            }}
          />
        }
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
}

export default BreadcrumbsComponent;
