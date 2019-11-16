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
