import * as types from "./types";
import * as ops from "./operations";

const initialState = {
  currentCard: { id: 0, front: "", back: "" },
  currentCardSet: null,
  cards: {
    colors: {
      1: { id: 1, front: "blue", back: "a color" },
      2: { id: 2, front: "red", back: "a color" },
      3: { id: 3, front: "black", back: "a color" },
      4: { id: 4, front: "purple", back: "a color" }
    }
  },
  allCardSet: ["colors"]
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
      return ops.addCard(state);
    case types.UPDATE_CARD:
      return ops.updateCard(state, action.payload);
    default:
      return state;
  }
}

export default card;
