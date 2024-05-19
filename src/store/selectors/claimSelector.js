import { createSelector } from "reselect";

const getClaimReducer = (state) => state.claim;

export const claimListStateSelector = createSelector(
  getClaimReducer,
  (data) => data.claimList
);
export const claimCreateStateSelector = createSelector(
  getClaimReducer,
  (data) => data.claimCreate
);
export const claimUpdateStateSelector = createSelector(
  getClaimReducer,
  (data) => data.claimUpdate
);
export const claimDeleteStateSelector = createSelector(
  getClaimReducer,
  (data) => data.claimDelete
);
