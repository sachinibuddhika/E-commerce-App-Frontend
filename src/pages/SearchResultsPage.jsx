import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation(); // Get the current URL location

  const query = new URLSearchParams(location.search).get("query"); // Extract the search query from the URL

  // Function to fetch search results
  const fetchSearchResults = async () => {
    if (!query) return; // If no query, don't proceed

    try {
      const response = await fetch(`http://localhost:4000/api/products`);
      const data = await response.json();

      // Filter products locally based on the query
      const filteredProducts = data.filter((product) => {
        const regex = new RegExp(query, "i");
        return (
          regex.test(product.productName) ||
          regex.test(product.description) ||
          regex.test(product.sku)
        );
      });

      if (filteredProducts.length === 0) {
        setError("No products found");
      } else {
        setProducts(filteredProducts);
      }
    } catch (error) {
      setError("An error occurred while fetching results.");
    }
  };

  useEffect(() => {
    fetchSearchResults(); // Fetch products when the page is loaded or query changes
  }, [query]);

  return (
    <div>
      {error && <div>{error}</div>} {/* Display error if no results */}
      {products.length > 0 ? (
        <div>
          <h3>Search Results for "{query}"</h3>
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                <strong>{product.productName}</strong>
                <br />
                SKU: {product.sku}
                <br />
                Description: {product.description}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
};

export default SearchResults;
