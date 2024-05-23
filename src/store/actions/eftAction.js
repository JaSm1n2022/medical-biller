export const EFT_ACTIONS = {
  ATTEMPT_TO_FETCH_EFT: "dashboard/@BILLER/ATTEMPT_TO_FETCH_EFT",
  SET_FETCH_EFT_SUCCEED: "dashboard/@BILLER/SET_FETCH_EFT_SUCCEED",
  SET_FETCH_EFT_FAILURE: "dashboard/@BILLER/SET_FETCH_EFT_FAILURE",
  RESET_FETCH_EFT_STATE: "dashboard/@BILLER/RESET_FETCH_EFT_STATE",

  ATTEMPT_TO_CREATE_EFT: "dashboard/@BILLER/ATTEMPT_TO_CREATE_EFT",
  SET_CREATE_EFT_SUCCEED: "dashboard/@BILLER/SET_CREATE_EFT_SUCCEED",
  SET_CREATE_EFT_FAILURE: "dashboard/@BILLER/SET_CREATE_EFT_FAILURE",
  RESET_CREATE_EFT_STATE: "dashboard/@BILLER/RESET_CREATE_EFT_STATE",

  ATTEMPT_TO_UPDATE_EFT: "dashboard/@BILLER/ATTEMPT_TO_UPDATE_EFT",
  SET_UPDATE_EFT_SUCCEED: "dashboard/@BILLER/SET_UPDATE_EFT_SUCCEED",
  SET_UPDATE_EFT_FAILURE: "dashboard/@BILLER/SET_UPDATE_EFT_FAILURE",
  RESET_UPDATE_EFT_STATE: "dashboard/@BILLER/RESET_UPDATE_EFT_STATE",

  ATTEMPT_TO_DELETE_EFT: "dashboard/@BILLER/ATTEMPT_TO_DELETE_EFT",
  SET_DELETE_EFT_SUCCEED: "dashboard/@BILLER/SET_DELETE_EFT_SUCCEED",
  SET_DELETE_EFT_FAILURE: "dashboard/@BILLER/SET_DELETE_EFT_FAILURE",
  RESET_DELETE_EFT_STATE: "dashboard/@BILLER/RESET_DELETE_EFT_STATE",
};
//FETCH Eft
export const attemptToFetchEft = (data: Object): BaseAction => ({
  type: EFT_ACTIONS.ATTEMPT_TO_FETCH_EFT,
  payload: data,
});
export const setFetchEftSucceed = (payload: Object): BaseAction => ({
  type: EFT_ACTIONS.SET_FETCH_EFT_SUCCEED,
  payload,
});

export const setFetchEftFailure = (payload: Object): BaseAction => ({
  type: EFT_ACTIONS.SET_FETCH_EFT_FAILURE,
  payload,
});
export const resetFetchEftState = (): BaseAction => ({
  type: EFT_ACTIONS.RESET_FETCH_EFT_STATE,
});

//CREATE Eft
export const attemptToCreateEft = (data: Object): BaseAction => ({
  type: EFT_ACTIONS.ATTEMPT_TO_CREATE_EFT,
  payload: data,
});
export const setCreateEftSucceed = (payload: Object): BaseAction => ({
  type: EFT_ACTIONS.SET_CREATE_EFT_SUCCEED,
  payload,
});

export const setCreateEftFailure = (payload: Object): BaseAction => ({
  type: EFT_ACTIONS.SET_CREATE_EFT_FAILURE,
  payload,
});
export const resetCreateEftState = (): BaseAction => ({
  type: EFT_ACTIONS.RESET_CREATE_EFT_STATE,
});

//UPDATE Eft
export const attemptToUpdateEft = (data: Object): BaseAction => ({
  type: EFT_ACTIONS.ATTEMPT_TO_UPDATE_EFT,
  payload: data,
});
export const setUpdateEftSucceed = (payload: Object): BaseAction => ({
  type: EFT_ACTIONS.SET_UPDATE_EFT_SUCCEED,
  payload,
});

export const setUpdateEftFailure = (payload: Object): BaseAction => ({
  type: EFT_ACTIONS.SET_UPDATE_EFT_FAILURE,
  payload,
});
export const resetUpdateEftState = (): BaseAction => ({
  type: EFT_ACTIONS.RESET_UPDATE_EFT_STATE,
});

//DELETE Eft
export const attemptToDeleteEft = (data: Object): BaseAction => ({
  type: EFT_ACTIONS.ATTEMPT_TO_DELETE_EFT,
  payload: data,
});
export const setDeleteEftSucceed = (payload: Object): BaseAction => ({
  type: EFT_ACTIONS.SET_DELETE_EFT_SUCCEED,
  payload,
});

export const setDeleteEftFailure = (payload: Object): BaseAction => ({
  type: EFT_ACTIONS.SET_DELETE_EFT_FAILURE,
  payload,
});
export const resetDeleteEftState = (): BaseAction => ({
  type: EFT_ACTIONS.RESET_DELETE_EFT_STATE,
});
