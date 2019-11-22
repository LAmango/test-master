import * as types from "./types";

export function setCards(card) {
  return {
    type: types.SET_CARDS,
    payload: card
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

export function addCard(newCard) {
  return {
    type: types.ADD_CARD,
    payload: newCard
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
    payload: itemId
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

export function setAllCardsets(cardsets) {
  return {
    type: types.SET_ALL_CARDSETS,
    payload: cardsets
  };
}

export function addCardset(name, cardsets) {
  return {
    type: types.ADD_CARDSET,
    payload: [name, cardsets]
  };
}

export function deleteCardset(name) {
  return {
    type: types.DELETE_CARDSET,
    payload: name
  };
}

export function flipCard() {
  return {
    type: types.FLIP_CARD
  };
}
