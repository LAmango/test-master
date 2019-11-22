import * as types from "./types";
import * as ops from "./operations";

export const initialState = {
  currentCard: null,
  currentCardSet: null,
  cards: {},
  allCardSets: [],
  flipped: false
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
    case types.ADD_CARDSET:
      return {
        ...state,
        currentCardSet: action.payload[0],
        currentCard: 0,
        allCardSets: state.allCardSets.concat(action.payload[0]),
        cards: {
          ...state.cards,
          [action.payload[0]]: action.payload[1]
        }
      };
    case types.DELETE_CARDSET:
      return ops.deleteCardset(state, action);
    case types.EDIT_CARDSET:
      return {
        ...state,
        currentCardSet: action.payload,
        allCardSets: state.allCardSets.map(cardset =>
          cardset === action.payload[0] ? action.payload[1] : cardset
        )
      };
    case types.FLIP_CARD:
      return {
        ...state,
        flipped: !state.flipped
      };
    default:
      return state;
  }
}

export default card;
