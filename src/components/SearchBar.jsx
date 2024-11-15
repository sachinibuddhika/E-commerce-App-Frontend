// SearchBar.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { setSearchQuery } from "../redux/actions/searchActions";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);

  // Handle input changes and update suggestions
  const handleSearchChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    dispatch(setSearchQuery(newQuery)); // Update the query in Redux

    if (newQuery.trim()) {
      try {
        // Make an API call to fetch search suggestions based on the query
        const response = await fetch(
          `http://localhost:4000/api/search?query=${newQuery}`
        );
        const data = await response.json();
        setSuggestions(data); // Update suggestions with the fetched data
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    } else {
      setSuggestions([]); // Clear suggestions if query is empty
    }
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      navigate(`/searchResults?query=${query}`); // Redirect to search results page with query parameter
    }
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
    >
      <TextField
        value={query}
        onChange={handleSearchChange}
        label="Search for Products"
        variant="outlined"
        fullWidth
      />
      <Button
        onClick={handleSearchSubmit}
        variant="contained"
        sx={{ marginLeft: "10px", height: "100%" }}
      >
        Search
      </Button>
      {/* Display suggestions */}
      {query && suggestions.length > 0 && (
        <List
          sx={{
            maxHeight: "200px",
            overflowY: "auto",
            position: "absolute",
            zIndex: 1,
            width: "100%",
          }}
        >
          {suggestions.map((product) => (
            // <ListItem
            //   button={true}
            //   key={product._id}
            //   onClick={() =>
            //     navigate(`/searchResults?query=${product.productName}`)
            //   }
            // >
            //   <ListItemText
            //     primary={`SKU: ${product.sku} | ${product.productName}`}
            //   />
            // </ListItem>
            <ListItem
              button // Just use 'button' here without an explicit value
              key={product._id}
              onClick={() =>
                navigate(`/searchResults?query=${product.productName}`)
              }
            >
              <ListItemText
                primary={`SKU: ${product.sku} | ${product.productName}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchBar;
