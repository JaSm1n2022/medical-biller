export const CLAIM_ACTIONS = {
  ATTEMPT_TO_FETCH_CLAIM: "dashboard/@BILLER/ATTEMPT_TO_FETCH_CLAIM",
  SET_FETCH_CLAIM_SUCCEED: "dashboard/@BILLER/SET_FETCH_CLAIM_SUCCEED",
  SET_FETCH_CLAIM_FAILURE: "dashboard/@BILLER/SET_FETCH_CLAIM_FAILURE",
  RESET_FETCH_CLAIM_STATE: "dashboard/@BILLER/RESET_FETCH_CLAIM_STATE",

  ATTEMPT_TO_CREATE_CLAIM: "dashboard/@BILLER/ATTEMPT_TO_CREATE_CLAIM",
  SET_CREATE_CLAIM_SUCCEED: "dashboard/@BILLER/SET_CREATE_CLAIM_SUCCEED",
  SET_CREATE_CLAIM_FAILURE: "dashboard/@BILLER/SET_CREATE_CLAIM_FAILURE",
  RESET_CREATE_CLAIM_STATE: "dashboard/@BILLER/RESET_CREATE_CLAIM_STATE",

  ATTEMPT_TO_UPDATE_CLAIM: "dashboard/@BILLER/ATTEMPT_TO_UPDATE_CLAIM",
  SET_UPDATE_CLAIM_SUCCEED: "dashboard/@BILLER/SET_UPDATE_CLAIM_SUCCEED",
  SET_UPDATE_CLAIM_FAILURE: "dashboard/@BILLER/SET_UPDATE_CLAIM_FAILURE",
  RESET_UPDATE_CLAIM_STATE: "dashboard/@BILLER/RESET_UPDATE_CLAIM_STATE",

  ATTEMPT_TO_DELETE_CLAIM: "dashboard/@BILLER/ATTEMPT_TO_DELETE_CLAIM",
  SET_DELETE_CLAIM_SUCCEED: "dashboard/@BILLER/SET_DELETE_CLAIM_SUCCEED",
  SET_DELETE_CLAIM_FAILURE: "dashboard/@BILLER/SET_DELETE_CLAIM_FAILURE",
  RESET_DELETE_CLAIM_STATE: "dashboard/@BILLER/RESET_DELETE_CLAIM_STATE",
};
//FETCH Claim
export const attemptToFetchClaim = (data: Object): BaseAction => ({
  type: CLAIM_ACTIONS.ATTEMPT_TO_FETCH_CLAIM,
  payload: data,
});
export const setFetchClaimSucceed = (payload: Object): BaseAction => ({
  type: CLAIM_ACTIONS.SET_FETCH_CLAIM_SUCCEED,
  payload,
});

export const setFetchClaimFailure = (payload: Object): BaseAction => ({
  type: CLAIM_ACTIONS.SET_FETCH_CLAIM_FAILURE,
  payload,
});
export const resetFetchClaimState = (): BaseAction => ({
  type: CLAIM_ACTIONS.RESET_FETCH_CLAIM_STATE,
});

//CREATE Claim
export const attemptToCreateClaim = (data: Object): BaseAction => ({
  type: CLAIM_ACTIONS.ATTEMPT_TO_CREATE_CLAIM,
  payload: data,
});
export const setCreateClaimSucceed = (payload: Object): BaseAction => ({
  type: CLAIM_ACTIONS.SET_CREATE_CLAIM_SUCCEED,
  payload,
});

export const setCreateClaimFailure = (payload: Object): BaseAction => ({
  type: CLAIM_ACTIONS.SET_CREATE_CLAIM_FAILURE,
  payload,
});
export const resetCreateClaimState = (): BaseAction => ({
  type: CLAIM_ACTIONS.RESET_CREATE_CLAIM_STATE,
});

//UPDATE Claim
export const attemptToUpdateClaim = (data: Object): BaseAction => ({
  type: CLAIM_ACTIONS.ATTEMPT_TO_UPDATE_CLAIM,
  payload: data,
});
export const setUpdateClaimSucceed = (payload: Object): BaseAction => ({
  type: CLAIM_ACTIONS.SET_UPDATE_CLAIM_SUCCEED,
  payload,
});

export const setUpdateClaimFailure = (payload: Object): BaseAction => ({
  type: CLAIM_ACTIONS.SET_UPDATE_CLAIM_FAILURE,
  payload,
});
export const resetUpdateClaimState = (): BaseAction => ({
  type: CLAIM_ACTIONS.RESET_UPDATE_CLAIM_STATE,
});

//DELETE Claim
export const attemptToDeleteClaim = (data: Object): BaseAction => ({
  type: CLAIM_ACTIONS.ATTEMPT_TO_DELETE_CLAIM,
  payload: data,
});
export const setDeleteClaimSucceed = (payload: Object): BaseAction => ({
  type: CLAIM_ACTIONS.SET_DELETE_CLAIM_SUCCEED,
  payload,
});

export const setDeleteClaimFailure = (payload: Object): BaseAction => ({
  type: CLAIM_ACTIONS.SET_DELETE_CLAIM_FAILURE,
  payload,
});
export const resetDeleteClaimState = (): BaseAction => ({
  type: CLAIM_ACTIONS.RESET_DELETE_CLAIM_STATE,
});
