

const initialState = {
  favorites: [], 
};

// Reducer function for handling actions related to favorites
const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case 'ADD_TO_FAVORITES':
      return {
        ...state, // Spread the current state to keep other properties intact
        favorites: [...state.favorites, action.payload], // Add the new item (payload) to the favorites array
      };

    // Action to remove an item from the favorites list
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state, 
        favorites: state.favorites.filter(item => item.id !== action.payload.id), // Filter out the item based on its ID
      };

    default:
      return state;
  }
};

export default favoritesReducer;
