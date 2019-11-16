import * as types from "./types";
import * as ops from "./operations";

export const initialState = {
  currentCard: null,
  currentCardSet: null,
  cards: {},
  allCardSets: []
};

export function card(state = initialState, action) {
  switch (action.type) {
    case types.SET_CARDS:
      return ops.setCards(state, action);
    case types.NEXT_CARD:
      return ops.nextCard(state);
    case types.PREV_CARD:
      return ops.prevCard(state);
    case types.ADD_CARD:
      return ops.addCard(state, action);
    case types.UPDATE_CARD:
      return ops.updateCard(state, action.payload);
    case types.SWAP_SIDES:
      return ops.swapSides(state, action.payload);
    case types.DELETE_CARD_ITEM:
      return ops.deleteCardItem(state, action);
    case types.SET_ALL_CARDSETS:
      return {
        ...state,
        allCardSets: action.payload
      };
    case types.GET_CARDSETS:
      return {
        ...state,
        cards: action.payload
      };
    default:
      return state;
  }
}

export default card;
