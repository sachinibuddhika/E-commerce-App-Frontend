
import { SET_SEARCH_QUERY, CLEAR_SEARCH_QUERY } from '../actions/actionTypes';


const initialState = {
  query: '',
};

// Search reducer to handle setting and clearing search queries
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case CLEAR_SEARCH_QUERY:
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default searchReducer;

  