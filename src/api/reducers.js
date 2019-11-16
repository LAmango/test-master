import * as types from "./types";

const initialState = {
  pending: false,
  error: null
};

export function cardsApi(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CARDS_PENDING:
      return {
        ...state,
        pending: true
      };
    case types.FETCH_CARDS_SUCCESS:
      return {
        ...state,
        pending: false
      };
    case types.FETCH_CARDS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default cardsApi;
