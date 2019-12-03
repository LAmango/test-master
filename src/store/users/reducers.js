import * as types from "./types";

const initialState = { currentUser: null, error: null, users: null };

function users(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        currentUser: action.payload[0],
        error: null
      };
    case types.SET_ERROR:
      return {
        ...state,
        error: action.payload[0]
      };
    case types.SET_USERS:
      return {
        ...state,
        users: action.payload[0]
      };
    case types.UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload[0]
      };
    case types.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload[0]._id
            ? {
                ...user,
                ...action.payload[0]
              }
            : user
        )
      };
    case types.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload[0])
      };
    default:
      return state;
  }
}

export default users;
