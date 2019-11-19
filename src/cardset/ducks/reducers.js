import * as types from "./types";

export const initialState = {
  currentCardset: null,
  cardsets: []
};

function cardsets(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CARDSET:
      return {
        ...state,
        cardsets: state.cardsets.concat(action.payload)
      };
    case types.DELETE_CARDSET:
      return {
        ...state,
        cardsets: state.cardsets.filter(cardset => cardset !== action.payload)
      };
    case types.SET_CARDSET:
      return {
        ...state,
        currentCardset: action.payload
      };
    case types.EDIT_CARDSET:
      return {
        ...state,
        currentCardset: action.payload,
        cardsets: state.cardsets.map(cardset =>
          cardset === action.payload[0] ? action.payload[1] : cardset
        )
      };
    default:
      return state;
  }
}

export default cardsets;
