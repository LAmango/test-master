import * as select from "./selectors";

export const setCards = (state, action) => {
  return {
    ...state,
    currentCard: { index: 0, ...state.cards[action.card][0] },
    currentCardSet: action.card
  };
};

export const nextCard = (state, action) => {
  const currentCardSet = select.getCurrentCardSet(state);
  const cardSetLength = select.getNumberOfCards(state);
  const nextTemp = state.currentCard.index + 1;
  const next = nextTemp > cardSetLength - 1 ? 0 : nextTemp;
  return {
    ...state,
    currentCard: { index: next, ...state.cards[currentCardSet][next] }
  };
};

export const prevCard = (state, action) => {
  const currentCardSet = select.getCurrentCardSet(state);
  const cardSetLength = select.getNumberOfCards(state);
  const prevTemp = state.currentCard.index - 1;
  const prev = prevTemp < 0 ? cardSetLength - 1 : prevTemp;
  return {
    ...state,
    currentCard: { index: prev, ...state.cards[currentCardSet][prev] }
  };
};

export const addCard = state => {
  const currentCardSet = select.getCurrentCardSet(state);
  if (currentCardSet === null) {
    return state;
  }
  const cardSetLength = select.getNumberOfCards(state);
  const newCard = { id: cardSetLength + 1, front: "", back: "" };
  return {
    ...state,
    cards: {
      ...state.cards,
      [currentCardSet]: state.cards[currentCardSet].concat(newCard)
    }
  };
};

export const updateCard = (state, action) => {
  const currentCardSet = select.getCurrentCardSet(state);
  const currentCard = select.getCurrentCard(state);
  if (currentCardSet === null) {
    return state;
  }
  const updatedCardSet = state.cards[currentCardSet].map(card =>
    card.id === action.card ? { ...card, [action.side]: action.content } : card
  );
  //check is card getting updated is the current card
  if (currentCard.id === action.card) {
    return {
      ...state,
      cards: {
        ...state.cards,
        [currentCardSet]: updatedCardSet
      },
      currentCard: {
        ...state.currentCard,
        [action.side]: action.content
      }
    };
  }
  return {
    ...state,
    cards: {
      ...state.cards,
      [currentCardSet]: updatedCardSet
    }
  };
};

export const deleteCardItem = (state, action) => {
  const currentCardSet = select.getCurrentCardSet(state);
  if (currentCardSet === null) {
    return state;
  }
  const newCardSet = state.cards[currentCardSet].filter(
    item => item.id !== action.itemId
  );
  return {
    ...state,
    cards: {
      ...state.cards,
      [currentCardSet]: newCardSet
    }
  };
};

export const swapSides = (state, action) => {
  const currentCardSet = select.getCurrentCardSet(state);
  const currentCard = select.getCurrentCard(state);
  if (currentCardSet === null) {
    return state;
  }

  const updatedCardSet = state.cards[currentCardSet].map(card =>
    card.id === action.itemId
      ? { ...card, front: action.back, back: action.front }
      : card
  );
  console.log("SWAP: ", currentCard.id, action);
  if (currentCard.id === action.itemId) {
    return {
      ...state,
      cards: {
        ...state.cards,
        [currentCardSet]: updatedCardSet
      },
      currentCard: {
        ...state.currentCard,
        front: action.back,
        back: action.front
      }
    };
  }
  return {
    ...state,
    cards: {
      ...state.cards,
      [currentCardSet]: updatedCardSet
    }
  };
};
