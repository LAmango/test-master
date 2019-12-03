import * as types from "./types";

const initialState = [];

function services(state = initialState, action) {
  switch (action.type) {
    case types.SET_SERVICES:
      return state.concat(action.payload[0]);
    case types.ADD_SERVICE:
      return state.concat(action.payload[0]);
    case types.UPDATE_SERVICE:
      return state.map(service =>
        service._id === action.payload[0]
          ? {
              ...service,
              title: action.payload[1],
              description: action.payload[2]
            }
          : service
      );

    case types.DELETE_SERVICE:
      return state.filter(service => service._id !== action.payload[0]);

    default:
      return state;
  }
}

export default services;
