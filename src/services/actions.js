import * as types from "./types";

export function setServices(services) {
  return {
    type: types.SET_SERVICES,
    payload: [services]
  };
}

export function addService(service) {
  return {
    type: types.ADD_SERVICE,
    payload: [service]
  };
}

export function updateService(serviceId, title, description) {
  return {
    type: types.UPDATE_SERVICE,
    payload: [serviceId, title, description]
  };
}

export function deleteServices(serviceId) {
  return {
    type: types.DELETE_SERVICE,
    payload: [serviceId]
  };
}
