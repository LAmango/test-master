import * as types from "./types";

export function fetchCardsPending() {
  return {
    type: types.FETCH_CARDS_PENDING
  };
}

export function fetchCardsSuccess(cards) {
  return {
    type: types.FETCH_CARDS_SUCCESS,
    cards: cards
  };
}

export function fetchCardsError(error) {
  return {
    type: types.FETCH_CARDS_ERROR,
    error: error
  };
}

export function fetchCards() {
  return {
    type: types.FETCH_CARDS
  };
}

export function addCard(cardsetId) {
  return {
    type: types.ADD_CARD,
    payload: cardsetId
  };
}

export function deleteCard(cardsetId, cardId) {
  return {
    type: types.DELETE_CARD,
    payload: [cardsetId, cardId]
  };
}

export function updateCard(cardsetId, cardId, side, content) {
  return {
    type: types.UPDATE_CARD,
    payload: [cardsetId, cardId, side, content]
  };
}

export function addCardset(name) {
  return {
    type: types.ADD_CARDSET,
    payload: [name]
  };
}

export function deleteCardset(cardsetId) {
  return {
    type: types.DELETE_CARDSET,
    payload: [cardsetId]
  };
}
