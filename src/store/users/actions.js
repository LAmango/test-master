import * as types from "./types";

export function setUser(user) {
  return {
    type: types.SET_USER,
    payload: [user]
  };
}

export function setUsers(users) {
  return {
    type: types.SET_USERS,
    payload: [users]
  };
}

export function addUser(user) {
  return {
    type: types.ADD_USER,
    payload: [user]
  };
}

export function updateUser(user) {
  return {
    type: types.UPDATE_USER,
    payload: [user]
  };
}

export function updateCurrentUser(user) {
  return {
    type: types.UPDATE_CURRENT_USER,
    payload: [user]
  };
}

export function deleteUser(userId) {
  return {
    type: types.DELETE_USER,
    payload: [userId]
  };
}
export function setError(error) {
  return {
    type: types.SET_ERROR,
    payload: [error]
  };
}
