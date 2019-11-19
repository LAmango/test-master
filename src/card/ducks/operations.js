import * as select from "./selectors";

export const setCards = (state, action) => {
  return {
    ...state,
    currentCard: 0,
    currentCardSet: action.payload
  };
};

export const nextCard = (state, action) => {
  const cardSetLength = select.getNumberOfCards(state);
  const nextTemp = state.currentCard + 1;
  const next = nextTemp > cardSetLength - 1 ? 0 : nextTemp;
  return {
    ...state,
    currentCard: next
  };
};

export const prevCard = (state, action) => {
  const cardSetLength = select.getNumberOfCards(state);
  const prevTemp = state.currentCard - 1;
  const prev = prevTemp < 0 ? cardSetLength - 1 : prevTemp;
  return {
    ...state,
    currentCard: prev
  };
};

export const addCard = (state, action) => {
  const currentCardSet = select.getCurrentCardSet(state);

  return {
    ...state,
    cards: {
      ...state.cards,
      [currentCardSet]: {
        ...state.cards[currentCardSet],
        cards: state.cards[currentCardSet].cards.concat(action.payload)
      }
    }
  };
};

export const updateCard = (state, action) => {
  const currentCardSet = select.getCurrentCardSet(state);
  const currentCard = select.getCurrentCard(state);
  const currentCardsSetArray = select.getCurrentCardSetArray(state);
  if (currentCardSet === null) {
    return state;
  }
  const updatedCardSet = state.cards[currentCardSet].cards.map(card =>
    card._id === action.card ? { ...card, [action.side]: action.content } : card
  );
  //check is card getting updated is the current card
  return {
    ...state,
    cards: {
      ...state.cards,
      [currentCardSet]: {
        ...state.cards[currentCardSet],
        cards: updatedCardSet
      }
    }
  };
};

export const deleteCardItem = (state, action) => {
  const currentCardSet = select.getCurrentCardSet(state);
  if (currentCardSet === null) {
    return state;
  }
  const newCards = state.cards[currentCardSet].cards.filter(
    item => item._id !== action.payload
  );
  return {
    ...state,
    cards: {
      ...state.cards,
      [currentCardSet]: {
        ...state.cards[currentCardSet],
        cards: newCards
      }
    }
  };
};

export const swapSides = (state, action) => {
  const currentCardSet = select.getCurrentCardSet(state);
  if (currentCardSet === null) {
    return state;
  }

  const updatedCardSet = state.cards[currentCardSet].cards.map(card =>
    card._id === action.itemId
      ? { ...card, front: action.back, back: action.front }
      : card
  );
  return {
    ...state,
    cards: {
      ...state.cards,
      [currentCardSet]: {
        ...state.cards[currentCardSet],
        cards: updatedCardSet
      }
    }
  };
};
