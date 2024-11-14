import { FETCH_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../types";

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:4000/api/products");
    const data = await response.json();

    // Set a default price if the price is missing in the fetched product
    const productsWithDefaultPrice = data.map((product) => ({
      ...product,
      price: product.price || 29.99, // Default price if no price exists
    }));

    dispatch({ type: "FETCH_PRODUCTS", payload: productsWithDefaultPrice });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// export const fetchProducts = () => async (dispatch) => {
//   try {
//     const response = await fetch("https://localhost:4000//api/products");
//     const data = await response.json();

//     if (response.ok) {
//       dispatch({
//         type: "FETCH_PRODUCTS_SUCCESS",
//         payload: data,
//       });
//     } else {
//       dispatch({
//         type: "FETCH_PRODUCTS_FAILURE",
//         payload: data,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: "FETCH_PRODUCTS_FAILURE",
//       payload: error.message,
//     });
//   }
// };



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