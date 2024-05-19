import { createSelector } from "reselect";

const getServiceReducer = (state) => state.service;

export const serviceListStateSelector = createSelector(
  getServiceReducer,
  (data) => data.serviceList
);
export const serviceCreateStateSelector = createSelector(
  getServiceReducer,
  (data) => data.serviceCreate
);
export const serviceUpdateStateSelector = createSelector(
  getServiceReducer,
  (data) => data.serviceUpdate
);
export const serviceDeleteStateSelector = createSelector(
  getServiceReducer,
  (data) => data.serviceDelete
);
