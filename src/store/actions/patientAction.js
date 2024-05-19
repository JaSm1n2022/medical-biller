export const PATIENT_ACTIONS = {
  ATTEMPT_TO_FETCH_PATIENT: "dashboard/@BILLER/ATTEMPT_TO_FETCH_PATIENT",
  SET_FETCH_PATIENT_SUCCEED: "dashboard/@BILLER/SET_FETCH_PATIENT_SUCCEED",
  SET_FETCH_PATIENT_FAILURE: "dashboard/@BILLER/SET_FETCH_PATIENT_FAILURE",
  RESET_FETCH_PATIENT_STATE: "dashboard/@BILLER/RESET_FETCH_PATIENT_STATE",

  ATTEMPT_TO_CREATE_PATIENT: "dashboard/@BILLER/ATTEMPT_TO_CREATE_PATIENT",
  SET_CREATE_PATIENT_SUCCEED: "dashboard/@BILLER/SET_CREATE_PATIENT_SUCCEED",
  SET_CREATE_PATIENT_FAILURE: "dashboard/@BILLER/SET_CREATE_PATIENT_FAILURE",
  RESET_CREATE_PATIENT_STATE: "dashboard/@BILLER/RESET_CREATE_PATIENT_STATE",

  ATTEMPT_TO_UPDATE_PATIENT: "dashboard/@BILLER/ATTEMPT_TO_UPDATE_PATIENT",
  SET_UPDATE_PATIENT_SUCCEED: "dashboard/@BILLER/SET_UPDATE_PATIENT_SUCCEED",
  SET_UPDATE_PATIENT_FAILURE: "dashboard/@BILLER/SET_UPDATE_PATIENT_FAILURE",
  RESET_UPDATE_PATIENT_STATE: "dashboard/@BILLER/RESET_UPDATE_PATIENT_STATE",

  ATTEMPT_TO_DELETE_PATIENT: "dashboard/@BILLER/ATTEMPT_TO_DELETE_PATIENT",
  SET_DELETE_PATIENT_SUCCEED: "dashboard/@BILLER/SET_DELETE_PATIENT_SUCCEED",
  SET_DELETE_PATIENT_FAILURE: "dashboard/@BILLER/SET_DELETE_PATIENT_FAILURE",
  RESET_DELETE_PATIENT_STATE: "dashboard/@BILLER/RESET_DELETE_PATIENT_STATE",
};
//FETCH Patient
export const attemptToFetchPatient = (data: Object): BaseAction => ({
  type: PATIENT_ACTIONS.ATTEMPT_TO_FETCH_PATIENT,
  payload: data,
});
export const setFetchPatientSucceed = (payload: Object): BaseAction => ({
  type: PATIENT_ACTIONS.SET_FETCH_PATIENT_SUCCEED,
  payload,
});

export const setFetchPatientFailure = (payload: Object): BaseAction => ({
  type: PATIENT_ACTIONS.SET_FETCH_PATIENT_FAILURE,
  payload,
});
export const resetFetchPatientState = (): BaseAction => ({
  type: PATIENT_ACTIONS.RESET_FETCH_PATIENT_STATE,
});

//CREATE Patient
export const attemptToCreatePatient = (data: Object): BaseAction => ({
  type: PATIENT_ACTIONS.ATTEMPT_TO_CREATE_PATIENT,
  payload: data,
});
export const setCreatePatientSucceed = (payload: Object): BaseAction => ({
  type: PATIENT_ACTIONS.SET_CREATE_PATIENT_SUCCEED,
  payload,
});

export const setCreatePatientFailure = (payload: Object): BaseAction => ({
  type: PATIENT_ACTIONS.SET_CREATE_PATIENT_FAILURE,
  payload,
});
export const resetCreatePatientState = (): BaseAction => ({
  type: PATIENT_ACTIONS.RESET_CREATE_PATIENT_STATE,
});

//UPDATE Patient
export const attemptToUpdatePatient = (data: Object): BaseAction => ({
  type: PATIENT_ACTIONS.ATTEMPT_TO_UPDATE_PATIENT,
  payload: data,
});
export const setUpdatePatientSucceed = (payload: Object): BaseAction => ({
  type: PATIENT_ACTIONS.SET_UPDATE_PATIENT_SUCCEED,
  payload,
});

export const setUpdatePatientFailure = (payload: Object): BaseAction => ({
  type: PATIENT_ACTIONS.SET_UPDATE_PATIENT_FAILURE,
  payload,
});
export const resetUpdatePatientState = (): BaseAction => ({
  type: PATIENT_ACTIONS.RESET_UPDATE_PATIENT_STATE,
});

//DELETE Patient
export const attemptToDeletePatient = (data: Object): BaseAction => ({
  type: PATIENT_ACTIONS.ATTEMPT_TO_DELETE_PATIENT,
  payload: data,
});
export const setDeletePatientSucceed = (payload: Object): BaseAction => ({
  type: PATIENT_ACTIONS.SET_DELETE_PATIENT_SUCCEED,
  payload,
});

export const setDeletePatientFailure = (payload: Object): BaseAction => ({
  type: PATIENT_ACTIONS.SET_DELETE_PATIENT_FAILURE,
  payload,
});
export const resetDeletePatientState = (): BaseAction => ({
  type: PATIENT_ACTIONS.RESET_DELETE_PATIENT_STATE,
});
