import { createSelector } from "reselect";

const getEftReducer = (state) => state.eft;

export const eftListStateSelector = createSelector(
  getEftReducer,
  (data) => data.eftList
);
export const eftCreateStateSelector = createSelector(
  getEftReducer,
  (data) => data.eftCreate
);
export const eftUpdateStateSelector = createSelector(
  getEftReducer,
  (data) => data.eftUpdate
);
export const eftDeleteStateSelector = createSelector(
  getEftReducer,
  (data) => data.eftDelete
);
