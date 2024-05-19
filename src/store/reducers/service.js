import type { BaseAction } from "../types/Action";
import type { ServiceState } from "../types";
import { SERVICE_ACTIONS } from "../actions/serviceAction";
import { ACTION_STATUSES } from "../../utils/constants";

const initialState = (): ServiceState => ({
  serviceList: {
    data: {},
    status: null,
    error: null,
  },
  serviceUpdate: {
    data: {},
    status: null,
    error: null,
  },
  serviceCreate: {
    data: {},
    status: null,
    error: null,
  },
  serviceDelete: {
    data: {},
    status: null,
    error: null,
  },
});

const ATTEMPT_TO_FETCH_SERVICE = (state: ServiceState) => ({
  ...state,
  serviceList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_FETCH_SERVICE_SUCCEED = (
  state: ServiceState,
  action: BaseAction
) => ({
  ...state,
  serviceList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_FETCH_SERVICE_FAILURE = (state: ServiceState) => ({
  ...state,
  serviceList: {
    ...state.serviceList,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_FETCH_SERVICE_STATE = (state: ServiceState) => ({
  ...state,
  serviceList: initialState().serviceList,
});

/*
Create
 */
const ATTEMPT_TO_CREATE_SERVICE = (state: ServiceState) => ({
  ...state,
  serviceCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_CREATE_SERVICE_SUCCEED = (
  state: ServiceState,
  action: BaseAction
) => ({
  ...state,
  serviceCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_CREATE_SERVICE_FAILURE = (state: ServiceState) => ({
  ...state,
  serviceCreate: {
    ...state.serviceCreate,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_CREATE_SERVICE_STATE = (state: ServiceState) => ({
  ...state,
  serviceCreate: initialState().serviceCreate,
});

/*
Update
 */
const ATTEMPT_TO_UPDATE_SERVICE = (state: ServiceState) => ({
  ...state,
  serviceUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_UPDATE_SERVICE_SUCCEED = (
  state: ServiceState,
  action: BaseAction
) => ({
  ...state,
  serviceUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_UPDATE_SERVICE_FAILURE = (state: ServiceState) => ({
  ...state,
  serviceUpdate: {
    ...state.serviceUpdate,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_UPDATE_SERVICE_STATE = (state: ServiceState) => ({
  ...state,
  serviceUpdate: initialState().serviceUpdate,
});

/*
Update
 */
const ATTEMPT_TO_DELETE_SERVICE = (state: ServiceState) => ({
  ...state,
  serviceDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_DELETE_SERVICE_SUCCEED = (
  state: ServiceState,
  action: BaseAction
) => ({
  ...state,
  serviceDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_DELETE_SERVICE_FAILURE = (state: ServiceState) => ({
  ...state,
  serviceDelete: {
    ...state.serviceDelete,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_DELETE_SERVICE_STATE = (state: ServiceState) => ({
  ...state,
  serviceDelete: initialState().serviceDelete,
});

const reducer = (state: ServiceState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case SERVICE_ACTIONS.ATTEMPT_TO_FETCH_SERVICE:
      return ATTEMPT_TO_FETCH_SERVICE(state);
    case SERVICE_ACTIONS.SET_FETCH_SERVICE_SUCCEED:
      return SET_FETCH_SERVICE_SUCCEED(state, action);
    case SERVICE_ACTIONS.SET_FETCH_SERVICE_FAILURE:
      return SET_FETCH_SERVICE_FAILURE(state);
    case SERVICE_ACTIONS.RESET_FETCH_SERVICE_STATE:
      return RESET_FETCH_SERVICE_STATE(state);

    case SERVICE_ACTIONS.ATTEMPT_TO_CREATE_SERVICE:
      return ATTEMPT_TO_CREATE_SERVICE(state);
    case SERVICE_ACTIONS.SET_CREATE_SERVICE_SUCCEED:
      return SET_CREATE_SERVICE_SUCCEED(state, action);
    case SERVICE_ACTIONS.SET_CREATE_SERVICE_FAILURE:
      return SET_CREATE_SERVICE_FAILURE(state);
    case SERVICE_ACTIONS.RESET_CREATE_SERVICE_STATE:
      return RESET_CREATE_SERVICE_STATE(state);

    case SERVICE_ACTIONS.ATTEMPT_TO_UPDATE_SERVICE:
      return ATTEMPT_TO_UPDATE_SERVICE(state);
    case SERVICE_ACTIONS.SET_UPDATE_SERVICE_SUCCEED:
      return SET_UPDATE_SERVICE_SUCCEED(state, action);
    case SERVICE_ACTIONS.SET_UPDATE_SERVICE_FAILURE:
      return SET_UPDATE_SERVICE_FAILURE(state);
    case SERVICE_ACTIONS.RESET_UPDATE_SERVICE_STATE:
      return RESET_UPDATE_SERVICE_STATE(state);

    case SERVICE_ACTIONS.ATTEMPT_TO_DELETE_SERVICE:
      return ATTEMPT_TO_DELETE_SERVICE(state);
    case SERVICE_ACTIONS.SET_DELETE_SERVICE_SUCCEED:
      return SET_DELETE_SERVICE_SUCCEED(state, action);
    case SERVICE_ACTIONS.SET_DELETE_SERVICE_FAILURE:
      return SET_DELETE_SERVICE_FAILURE(state);
    case SERVICE_ACTIONS.RESET_DELETE_SERVICE_STATE:
      return RESET_DELETE_SERVICE_STATE(state);
    default:
      return state;
  }
};

export default reducer;
