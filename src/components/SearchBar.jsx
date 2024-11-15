// SearchBar.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import { setSearchQuery } from "../redux/actions/searchActions";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);

  // const handleSearchChange = (event) => {
  //   setQuery(event.target.value);
  //   dispatch(setSearchQuery(event.target.value)); // Update search query in Redux store
  // };
  // Handle input changes and update suggestions
  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    dispatch(setSearchQuery(newQuery));

    // Filter products for suggestions
    const filteredSuggestions = products.filter((product) =>
      product.productName.toLowerCase().includes(newQuery.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
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
            <ListItem
              button
              key={product._id}
              onClick={() =>
                navigate(`/searchResults?query=${product.productName}`)
              }
            >
              <ListItemText primary={product.productName} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchBar;
