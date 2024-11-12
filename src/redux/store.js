import { createStore, applyMiddleware } from 'redux';  // Import createStore and applyMiddleware
import { thunk } from 'redux-thunk';  // Named import for redux-thunk

// Import your reducers
import rootReducer from './reducers';  // Assuming you have a combined reducer

// Create the store with middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)  // Apply the thunk middleware
);

export default store;

