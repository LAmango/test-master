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

export function fetchServices() {
  return {
    type: types.FETCH_SERVICES
  };
}

export function addService(title, description) {
  return {
    type: types.ADD_SERVICE,
    payload: [title, description]
  };
}

export function deleteService(serviceId) {
  return {
    type: types.DELETE_SERIVICE,
    payload: [serviceId]
  };
}

export function updateSerivce(serviceId, title, description) {
  return {
    type: types.UPDATE_SERVICE,
    payload: [serviceId, title, description]
  };
}

export function login(email, password) {
  return {
    type: types.LOGIN,
    payload: [email, password]
  };
}

export function register(email, password) {
  return {
    type: types.REGISTER,
    payload: [email, password]
  };
}

export function deleteUser(userId) {
  return {
    type: types.DELETE_USER,
    payload: [userId]
  };
}

export function updateUser(userId, user) {
  return {
    type: types.UPDATE_USER,
    payload: [userId, user]
  };
}

export function updateCurrentUser(userId, user) {
  return {
    type: types.UPDATE_CURRENT_USER,
    payload: [userId, user]
  };
}

export function fetchUsers() {
  return {
    type: types.FETCH_USERS
  };
}
