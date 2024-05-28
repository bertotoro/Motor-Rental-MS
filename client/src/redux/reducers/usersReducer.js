// usersReducer.js

const initialState = {
    users: [], // Initial state for the users array
    loading: false,
    error: null
  };
  
  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ALL_USERS_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'GET_ALL_USERS_SUCCESS':
        return {
          ...state,
          users: action.payload, // Update the users array with fetched users
          loading: false,
          error: null
        };
      case 'GET_ALL_USERS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload // Set the error message in case of failure
        };
        case 'DELETE_USER':
            return {
              ...state,
              users: state.users.filter(user => user._id !== action.payload) // Remove the deleted user from the users array
            };
      // Additional cases for other user-related actions can be added here
      default:
        return state;
    }
  };
  
  export default usersReducer;
  