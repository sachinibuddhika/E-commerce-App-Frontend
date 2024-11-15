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
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Extract search query from URL
  useEffect(() => {
    const queryParam = new URLSearchParams(location.search).get("query");
    setQuery(queryParam || ""); // Set query from URL or default to empty string

    // Fetch filtered products from backend based on the query
    if (queryParam) {
      fetch(`http://localhost:4000/api/search?query=${queryParam}`)
        .then((res) => res.json())
        .then((data) => setFilteredProducts(data))
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    }
  }, [location.search]);

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
                {/* Check if price exists and if not, use a default value */}
                <TableCell>
                  {product.price
                    ? `$${product.price.toFixed(2)}`
                    : "Price not available"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SearchResultsPage;
