export const SERVICE_ACTIONS = {
  ATTEMPT_TO_FETCH_SERVICE: "dashboard/@BILLER/ATTEMPT_TO_FETCH_SERVICE",
  SET_FETCH_SERVICE_SUCCEED: "dashboard/@BILLER/SET_FETCH_SERVICE_SUCCEED",
  SET_FETCH_SERVICE_FAILURE: "dashboard/@BILLER/SET_FETCH_SERVICE_FAILURE",
  RESET_FETCH_SERVICE_STATE: "dashboard/@BILLER/RESET_FETCH_SERVICE_STATE",

  ATTEMPT_TO_CREATE_SERVICE: "dashboard/@BILLER/ATTEMPT_TO_CREATE_SERVICE",
  SET_CREATE_SERVICE_SUCCEED: "dashboard/@BILLER/SET_CREATE_SERVICE_SUCCEED",
  SET_CREATE_SERVICE_FAILURE: "dashboard/@BILLER/SET_CREATE_SERVICE_FAILURE",
  RESET_CREATE_SERVICE_STATE: "dashboard/@BILLER/RESET_CREATE_SERVICE_STATE",

  ATTEMPT_TO_UPDATE_SERVICE: "dashboard/@BILLER/ATTEMPT_TO_UPDATE_SERVICE",
  SET_UPDATE_SERVICE_SUCCEED: "dashboard/@BILLER/SET_UPDATE_SERVICE_SUCCEED",
  SET_UPDATE_SERVICE_FAILURE: "dashboard/@BILLER/SET_UPDATE_SERVICE_FAILURE",
  RESET_UPDATE_SERVICE_STATE: "dashboard/@BILLER/RESET_UPDATE_SERVICE_STATE",

  ATTEMPT_TO_DELETE_SERVICE: "dashboard/@BILLER/ATTEMPT_TO_DELETE_SERVICE",
  SET_DELETE_SERVICE_SUCCEED: "dashboard/@BILLER/SET_DELETE_SERVICE_SUCCEED",
  SET_DELETE_SERVICE_FAILURE: "dashboard/@BILLER/SET_DELETE_SERVICE_FAILURE",
  RESET_DELETE_SERVICE_STATE: "dashboard/@BILLER/RESET_DELETE_SERVICE_STATE",
};
//FETCH Service
export const attemptToFetchService = (data: Object): BaseAction => ({
  type: SERVICE_ACTIONS.ATTEMPT_TO_FETCH_SERVICE,
  payload: data,
});
export const setFetchServiceSucceed = (payload: Object): BaseAction => ({
  type: SERVICE_ACTIONS.SET_FETCH_SERVICE_SUCCEED,
  payload,
});

export const setFetchServiceFailure = (payload: Object): BaseAction => ({
  type: SERVICE_ACTIONS.SET_FETCH_SERVICE_FAILURE,
  payload,
});
export const resetFetchServiceState = (): BaseAction => ({
  type: SERVICE_ACTIONS.RESET_FETCH_SERVICE_STATE,
});

//CREATE Service
export const attemptToCreateService = (data: Object): BaseAction => ({
  type: SERVICE_ACTIONS.ATTEMPT_TO_CREATE_SERVICE,
  payload: data,
});
export const setCreateServiceSucceed = (payload: Object): BaseAction => ({
  type: SERVICE_ACTIONS.SET_CREATE_SERVICE_SUCCEED,
  payload,
});

export const setCreateServiceFailure = (payload: Object): BaseAction => ({
  type: SERVICE_ACTIONS.SET_CREATE_SERVICE_FAILURE,
  payload,
});
export const resetCreateServiceState = (): BaseAction => ({
  type: SERVICE_ACTIONS.RESET_CREATE_SERVICE_STATE,
});

//UPDATE Service
export const attemptToUpdateService = (data: Object): BaseAction => ({
  type: SERVICE_ACTIONS.ATTEMPT_TO_UPDATE_SERVICE,
  payload: data,
});
export const setUpdateServiceSucceed = (payload: Object): BaseAction => ({
  type: SERVICE_ACTIONS.SET_UPDATE_SERVICE_SUCCEED,
  payload,
});

export const setUpdateServiceFailure = (payload: Object): BaseAction => ({
  type: SERVICE_ACTIONS.SET_UPDATE_SERVICE_FAILURE,
  payload,
});
export const resetUpdateServiceState = (): BaseAction => ({
  type: SERVICE_ACTIONS.RESET_UPDATE_SERVICE_STATE,
});

//DELETE Service
export const attemptToDeleteService = (data: Object): BaseAction => ({
  type: SERVICE_ACTIONS.ATTEMPT_TO_DELETE_SERVICE,
  payload: data,
});
export const setDeleteServiceSucceed = (payload: Object): BaseAction => ({
  type: SERVICE_ACTIONS.SET_DELETE_SERVICE_SUCCEED,
  payload,
});

export const setDeleteServiceFailure = (payload: Object): BaseAction => ({
  type: SERVICE_ACTIONS.SET_DELETE_SERVICE_FAILURE,
  payload,
});
export const resetDeleteServiceState = (): BaseAction => ({
  type: SERVICE_ACTIONS.RESET_DELETE_SERVICE_STATE,
});
