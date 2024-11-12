import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import favoritesReducer from "./favoritesReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  favorites: favoritesReducer,
  search: searchReducer,
});

export default rootReducer;