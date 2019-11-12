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

export function deleteCardItem(itemId) {
  return {
    type: types.DELETE_CARD_ITEM,
    payload: { itemId: itemId }
  };
}
export function swapSides(itemId, front, back) {
  return {
    type: types.SWAP_SIDES,
    payload: { itemId: itemId, front: front, back: back }
  };
}

export function getCardsets(cardsets) {
  return {
    type: types.GET_CARDSETS,
    payload: cardsets
  };
}
