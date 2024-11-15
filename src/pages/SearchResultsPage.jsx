// import React from "react";

// function SearchResultsPage() {
//   return (
//     <div>
//       <h1>Search Results Page</h1>
//     </div>

//   );
// }

// export default SearchResultsPage;
// SearchResultsPage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const SearchResultsPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const products = useSelector((state) => state.products.products);

  // Extract search query from URL
  useEffect(() => {
    const queryParam = new URLSearchParams(location.search).get("query");
    setQuery(queryParam || ""); // Set query from URL or default to empty string
  }, [location.search]);

  // Filter products based on search query
  // const filteredProducts = products.filter((product) =>
  //   product.productName.toLowerCase().includes(query.toLowerCase())
  // );
  const filterProducts = (products, query) => {
    if (!query) return products; // If no query, return all products

    return products.filter((product) => {
      // Convert query and product fields to lowercase for case-insensitive search
      const lowerQuery = query.toLowerCase();
      return (
        product.productName.toLowerCase().includes(lowerQuery) ||
        product.sku.toLowerCase().includes(lowerQuery) ||
        product.description?.toLowerCase().includes(lowerQuery) || // Example: Search by description if it exists
        product.category?.toLowerCase().includes(lowerQuery) // Example: Search by category if it exists
      );
    });
  };

  const filteredProducts = filterProducts(products, query);

  return (
    <div>
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h4">Search Results for: "{query}"</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SearchResultsPage;
