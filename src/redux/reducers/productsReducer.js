
import { FETCH_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../types";


const initialState = {
  products: [], 
};

// Reducer function for managing product-related actions
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
 
    case FETCH_PRODUCTS:
      return { 
        ...state, // Spread the current state
        products: action.payload, // Set the products array to the fetched data (payload)
      };

    // Action to add a new product to the products list
    case ADD_PRODUCT:
      return { 
        ...state, 
        products: [...state.products, action.payload], // Append the new product (payload) to the products array
      };

    // Action to delete a product based on its unique ID
    case DELETE_PRODUCT:
      return {
        ...state, 
        products: state.products.filter((product) => product._id !== action.payload), // Filter out the product by matching ID
      };

    // Action to update a product by its ID with the new product data (payload)
    case UPDATE_PRODUCT:
      return {
        ...state, 
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product // Replace the product if IDs match, otherwise return the unchanged product
        ),
      };

   
    default:
      return state;
  }
};

export default productsReducer;
