
import { SET_SEARCH_QUERY, CLEAR_SEARCH_QUERY } from './actionTypes';

// Action to set the search query
export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

// Action to clear the search query
export const clearSearchQuery = () => ({
  type: CLEAR_SEARCH_QUERY,
});
