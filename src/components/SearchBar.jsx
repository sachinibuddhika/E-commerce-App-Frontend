import React, { useState, useEffect } from "react";
import { TextField, Button, Box, List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState(""); // User input
  const [products, setProducts] = useState([]); // All products from backend
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on query
  const navigate = useNavigate();

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        const data = await response.json();
        setProducts(data); // Set all products from the backend
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search input changes and filter products locally
  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    // Filter products based on query entered by user
    if (newQuery.trim()) {
      const filtered = products.filter((product) => {
        const regex = new RegExp(newQuery, "i"); // Case-insensitive search
        return (
          regex.test(product.productName) ||
          regex.test(product.description) ||
          regex.test(product.sku)
        );
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Reset if query is empty
    }
  };

  // Handle search submit
  const handleSearchSubmit = () => {
    if (query.trim()) {
      navigate(`/searchResults?query=${query}`);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "18px",
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
        width: "800px",
        height: "49px",
      }}
    >
      <TextField
        value={query}
        onChange={handleSearchChange}
        label="Search for Products"
        variant="outlined"
        fullWidth
        sx={{
          height: "15px",
          marginLeft: "-50px",
          borderRadius: "25px",
        }}
      />
      <Button
        onClick={handleSearchSubmit}
        variant="contained"
        sx={{
          marginLeft: "10px",
          height: "100%",
          backgroundColor: "#001EB9",
          borderRadius: "25px",
          color: "white",
          "&:hover": {
            backgroundColor: "#001EB9",
          },
        }}
      >
        Search
      </Button>

      {/* Display filtered suggestions dynamically */}
      {query && filteredProducts.length > 0 && (
        <List
          sx={{
            maxHeight: "200px",
            overflowY: "auto",
            position: "absolute",
            zIndex: 1,
            width: "30%",
          }}
        >
          {filteredProducts.map((product, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleSearchSubmit(product.productName)}
            >
              {product.productName}{" "}
              {/* Display product name in the suggestions */}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchBar;
