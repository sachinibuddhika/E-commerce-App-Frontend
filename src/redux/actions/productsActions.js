import { FETCH_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../types";

// Action to fetch products
export const fetchProducts = () => async (dispatch) => {
    try {
      const response = await fetch("http://localhost:4000/api/products");
      const data = await response.json();
      dispatch({ type: FETCH_PRODUCTS, payload: data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  // Action to add a product
export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: product,
  });


  // Action to delete a product
export const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    payload: productId,
  });

  // Action to update a product
export const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: product,
  });