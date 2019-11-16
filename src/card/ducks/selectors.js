import { createSelector } from "reselect";

export const getCards = state => state.cards;
export const getCurrentCard = state => state.currentCard;
export const getCurrentCardSet = state => state.currentCardSet;
export const getCardsetNames = state => state.allCardSets;

export const getNumberOfCards = createSelector(
  [getCards, getCurrentCardSet],
  (cards, currentCardSet) => {
    if (currentCardSet) {
      return cards[currentCardSet].cards.length;
    } else {
      return null;
    }
  }
);

export const getCurrentCardSetArray = createSelector(
  [getCards, getCurrentCardSet],
  (cards, currentCardSet) => {
    if (currentCardSet) {
      return cards[currentCardSet].cards;
    } else {
      return null;
    }
  }
);
