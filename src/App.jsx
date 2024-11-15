import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import FavoriteProductsPage from "./pages/FavoriteProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="addProduct" element={<AddProductPage />} />
            <Route path="/editProduct/:sku" element={<EditProductPage />} />
            <Route path="favorites" element={<FavoriteProductsPage />} />
            <Route path="productDetails" element={<ProductDetailPage />} />
            <Route path="searchResults" element={<SearchResultsPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
