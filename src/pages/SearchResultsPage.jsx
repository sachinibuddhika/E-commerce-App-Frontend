import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Extract search query from URL
  useEffect(() => {
    const queryParam = new URLSearchParams(location.search).get("query");
    setQuery(queryParam || ""); // Set query from URL or default to empty string

    // Fetch filtered products from the backend based on the query
    if (queryParam) {
      fetch(`http://localhost:4000/api/search?query=${queryParam}`)
        .then((res) => res.json())
        .then((data) => {
          // Filter products based on the query (ensure they contain the search term)
          const filtered = data.filter((product) => {
            const searchQuery = queryParam.toLowerCase();
            const productData = `${product.productName} ${product.description} ${product.sku} ${product.price}`;
            // Check if any field contains the search term
            return productData.toLowerCase().includes(searchQuery);
          });
          setFilteredProducts(filtered); // Update state with filtered results
        })
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    }
  }, [location.search]);

  // Handle redirection to the product detail page
  const handleProductDetail = (productId) => {
    navigate(`/productDetails/${productId}`); // Navigate to product details page
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: "20px" }}>
        Search Results for: "{query}"
      </Typography>

      {/* Display product results */}
      {filteredProducts.length > 0 ? (
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                {/* Display the product details */}
                <Typography variant="h6">{product.productName}</Typography>
                <Typography variant="body1">SKU: {product.sku}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="h6">
                  {product.price
                    ? `$${product.price.toFixed(2)}`
                    : "Price not available"}
                </Typography>
                <IconButton
                  sx={{ marginTop: "10px" }}
                  onClick={() => handleProductDetail(product._id)}
                  color="primary"
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center" sx={{ marginTop: "20px" }}>
          No products found for "{query}"
        </Typography>
      )}
    </Box>
  );
};

export default SearchResultsPage;
