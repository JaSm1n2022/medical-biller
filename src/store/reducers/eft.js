import type { BaseAction } from "../types/Action";
import type { EftState } from "../types";
import { EFT_ACTIONS } from "../actions/eftAction";
import { ACTION_STATUSES } from "../../utils/constants";

const initialState = (): EftState => ({
  eftList: {
    data: {},
    status: null,
    error: null,
  },
  eftUpdate: {
    data: {},
    status: null,
    error: null,
  },
  eftCreate: {
    data: {},
    status: null,
    error: null,
  },
  eftDelete: {
    data: {},
    status: null,
    error: null,
  },
});

const ATTEMPT_TO_FETCH_EFT = (state: EftState) => ({
  ...state,
  eftList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_FETCH_EFT_SUCCEED = (state: EftState, action: BaseAction) => ({
  ...state,
  eftList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_FETCH_EFT_FAILURE = (state: EftState) => ({
  ...state,
  eftList: {
    ...state.eftList,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_FETCH_EFT_STATE = (state: EftState) => ({
  ...state,
  eftList: initialState().eftList,
});

/*
Create
 */
const ATTEMPT_TO_CREATE_EFT = (state: EftState) => ({
  ...state,
  eftCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_CREATE_EFT_SUCCEED = (state: EftState, action: BaseAction) => ({
  ...state,
  eftCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_CREATE_EFT_FAILURE = (state: EftState) => ({
  ...state,
  eftCreate: {
    ...state.eftCreate,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_CREATE_EFT_STATE = (state: EftState) => ({
  ...state,
  eftCreate: initialState().eftCreate,
});

/*
Update
 */
const ATTEMPT_TO_UPDATE_EFT = (state: EftState) => ({
  ...state,
  eftUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_UPDATE_EFT_SUCCEED = (state: EftState, action: BaseAction) => ({
  ...state,
  eftUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_UPDATE_EFT_FAILURE = (state: EftState) => ({
  ...state,
  eftUpdate: {
    ...state.eftUpdate,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_UPDATE_EFT_STATE = (state: EftState) => ({
  ...state,
  eftUpdate: initialState().eftUpdate,
});

/*
Update
 */
const ATTEMPT_TO_DELETE_EFT = (state: EftState) => ({
  ...state,
  eftDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_DELETE_EFT_SUCCEED = (state: EftState, action: BaseAction) => ({
  ...state,
  eftDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_DELETE_EFT_FAILURE = (state: EftState) => ({
  ...state,
  eftDelete: {
    ...state.eftDelete,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_DELETE_EFT_STATE = (state: EftState) => ({
  ...state,
  eftDelete: initialState().eftDelete,
});

const reducer = (state: EftState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case EFT_ACTIONS.ATTEMPT_TO_FETCH_EFT:
      return ATTEMPT_TO_FETCH_EFT(state);
    case EFT_ACTIONS.SET_FETCH_EFT_SUCCEED:
      return SET_FETCH_EFT_SUCCEED(state, action);
    case EFT_ACTIONS.SET_FETCH_EFT_FAILURE:
      return SET_FETCH_EFT_FAILURE(state);
    case EFT_ACTIONS.RESET_FETCH_EFT_STATE:
      return RESET_FETCH_EFT_STATE(state);

    case EFT_ACTIONS.ATTEMPT_TO_CREATE_EFT:
      return ATTEMPT_TO_CREATE_EFT(state);
    case EFT_ACTIONS.SET_CREATE_EFT_SUCCEED:
      return SET_CREATE_EFT_SUCCEED(state, action);
    case EFT_ACTIONS.SET_CREATE_EFT_FAILURE:
      return SET_CREATE_EFT_FAILURE(state);
    case EFT_ACTIONS.RESET_CREATE_EFT_STATE:
      return RESET_CREATE_EFT_STATE(state);

    case EFT_ACTIONS.ATTEMPT_TO_UPDATE_EFT:
      return ATTEMPT_TO_UPDATE_EFT(state);
    case EFT_ACTIONS.SET_UPDATE_EFT_SUCCEED:
      return SET_UPDATE_EFT_SUCCEED(state, action);
    case EFT_ACTIONS.SET_UPDATE_EFT_FAILURE:
      return SET_UPDATE_EFT_FAILURE(state);
    case EFT_ACTIONS.RESET_UPDATE_EFT_STATE:
      return RESET_UPDATE_EFT_STATE(state);

    case EFT_ACTIONS.ATTEMPT_TO_DELETE_EFT:
      return ATTEMPT_TO_DELETE_EFT(state);
    case EFT_ACTIONS.SET_DELETE_EFT_SUCCEED:
      return SET_DELETE_EFT_SUCCEED(state, action);
    case EFT_ACTIONS.SET_DELETE_EFT_FAILURE:
      return SET_DELETE_EFT_FAILURE(state);
    case EFT_ACTIONS.RESET_DELETE_EFT_STATE:
      return RESET_DELETE_EFT_STATE(state);
    default:
      return state;
  }
};

export default reducer;
