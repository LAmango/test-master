import * as types from "./types";

export function addCardset(name) {
  return {
    type: types.ADD_CARDSET,
    payload: name
  };
}

export function deleteCardset(name) {
  return {
    type: types.DELETE_CARDSET,
    payload: name
  };
}

export function setCardset(name) {
  return {
    type: types.SET_CARDSET,
    payload: name
  };
}

export function editCardset(name) {
  return {
    type: types.EDIT_CARDSET,
    payload: name
  };
}
