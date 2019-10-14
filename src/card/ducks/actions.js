import * as types from "./types";

export function setCards(card) {
  return {
    type: types.SET_CARDS,
    card: card
  };
}

export function nextCard() {
  return {
    type: types.NEXT_CARD
  };
}

export function prevCard() {
  return {
    type: types.PREV_CARD
  };
}

export function addCard() {
  return {
    type: types.ADD_CARD
  };
}

export function updateCard(card, side, content) {
  return {
    type: types.UPDATE_CARD,
    payload: { card: card, side: side, content: content }
  };
}
