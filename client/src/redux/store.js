import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { alertsReducer } from './reducers/alertsReducer';
import { carsReducer } from './reducers/bikesReducer';
import { bookingsReducer } from './reducers/bookingsReducer';
import usersReducer from './reducers/usersReducer'; // Import the usersReducer

const composeEnhancers = composeWithDevTools({});

// Combine all your reducers
const rootReducer = combineReducers({
  carsReducer,
  alertsReducer,
  bookingsReducer,
  usersReducer // Include the usersReducer with a key named 'users'
});

// Create the Redux store with rootReducer and apply thunk middleware
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;
