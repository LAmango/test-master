import * as select from "./selectors";

export const setCards = (state, action) => {
  return {
    ...state,
    currentCard: state.cards[action.card][1],
    currentCardSet: action.card
  };
};

export const nextCard = (state, action) => {
  const currentCardSet = select.getCurrentCardSet(state);
  const cardSetLength = select.getNumberOfCards(state);
  const nextTemp = state.currentCard.id + 1;
  const next = nextTemp > cardSetLength ? 1 : nextTemp;
  return {
    ...state,
    currentCard: state.cards[currentCardSet][next]
  };
};

export const prevCard = (state, action) => {
  const currentCardSet = select.getCurrentCardSet(state);
  const cardSetLength = select.getNumberOfCards(state);
  const prevTemp = state.currentCard.id - 1;
  const prev = prevTemp < 1 ? cardSetLength : prevTemp;
  return {
    ...state,
    currentCard: state.cards[currentCardSet][prev]
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
      [currentCardSet]: {
        ...state.cards[currentCardSet],
        [cardSetLength + 1]: newCard
      }
    }
  };
};

export const updateCard = (state, action) => {
  const currentCardSet = select.getCurrentCardSet(state);
  if (currentCardSet === null) {
    return state;
  }
  console.log(action);
  return {
    ...state,
    cards: {
      ...state.cards,
      [currentCardSet]: {
        ...state.cards[currentCardSet],
        [action.card]: {
          ...state.cards[currentCardSet][action.card],
          [action.side]: action.content
        }
      }
    }
  };
};
