import { createSelector } from "reselect";
import card from "./reducers";

export const getCards = state => state.cards;
export const getCurrentCard = state => state.currentCard;
export const getCurrentCardSet = state => state.currentCardSet;

export const getNumberOfCards = createSelector(
  [getCards, getCurrentCardSet],
  (cards, currentCardSet) => {
    if (currentCardSet) {
      return Object.keys(cards[currentCardSet]).length;
    } else {
      return card;
    }
  }
);
