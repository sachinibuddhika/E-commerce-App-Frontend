import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, List, ListItem } from "@mui/material";
import { setSearchQuery } from "../redux/actions/searchActions";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes and update suggestions
  const handleSearchChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    dispatch(setSearchQuery(newQuery)); // Update the query in Redux

    if (newQuery.trim()) {
      try {
        // Fetch search suggestions from the backend based on the query
        const response = await fetch(
          `http://localhost:4000/api/search?query=${newQuery}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search suggestions");
        }

        const data = await response.json();
        setSuggestions(data); // Update suggestions with the fetched words
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
        setSuggestions([]); // Clear suggestions on error
      }
    } else {
      setSuggestions([]); // Clear suggestions if query is empty
    }
  };

  // Handle submitting the search (clicking on a suggestion)
  // const handleSearchSubmit = (word) => {
  //   if (word.trim()) {
  //     navigate(`/searchResults?query=${word}`); // Redirect to search results page with the selected word
  //   }
  // };

  const handleSearchSubmit = (word) => {
    if (word.trim()) {
      dispatch(setSearchQuery(word)); // Update the selected word in Redux
      navigate(`/searchResults?query=${word}`); // Navigate to search results page with query
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
        onClick={() => {
          handleSearchSubmit(query);
          console.log(query);
        }}
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
            width: "30%",
          }}
        >
          {suggestions.map((word, index) => (
            <ListItem
              button
              key={index} // Use index for word since it's unique
              onClick={() => {
                console.log(word); // Log the word
                handleSearchSubmit(word); // Call the search function
              }} // On click, search for all products that match this word
            >
              {word} {/* Display the word only */}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchBar;
