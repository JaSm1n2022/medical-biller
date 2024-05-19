import type { BaseAction } from "../types/Action";
import type { ClaimState } from "../types";
import { CLAIM_ACTIONS } from "../actions/claimAction";
import { ACTION_STATUSES } from "../../utils/constants";

const initialState = (): ClaimState => ({
  claimList: {
    data: {},
    status: null,
    error: null,
  },
  claimUpdate: {
    data: {},
    status: null,
    error: null,
  },
  claimCreate: {
    data: {},
    status: null,
    error: null,
  },
  claimDelete: {
    data: {},
    status: null,
    error: null,
  },
});

const ATTEMPT_TO_FETCH_CLAIM = (state: ClaimState) => ({
  ...state,
  claimList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_FETCH_CLAIM_SUCCEED = (state: ClaimState, action: BaseAction) => ({
  ...state,
  claimList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_FETCH_CLAIM_FAILURE = (state: ClaimState) => ({
  ...state,
  claimList: {
    ...state.claimList,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_FETCH_CLAIM_STATE = (state: ClaimState) => ({
  ...state,
  claimList: initialState().claimList,
});

/*
Create
 */
const ATTEMPT_TO_CREATE_CLAIM = (state: ClaimState) => ({
  ...state,
  claimCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_CREATE_CLAIM_SUCCEED = (state: ClaimState, action: BaseAction) => ({
  ...state,
  claimCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_CREATE_CLAIM_FAILURE = (state: ClaimState) => ({
  ...state,
  claimCreate: {
    ...state.claimCreate,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_CREATE_CLAIM_STATE = (state: ClaimState) => ({
  ...state,
  claimCreate: initialState().claimCreate,
});

/*
Update
 */
const ATTEMPT_TO_UPDATE_CLAIM = (state: ClaimState) => ({
  ...state,
  claimUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_UPDATE_CLAIM_SUCCEED = (state: ClaimState, action: BaseAction) => ({
  ...state,
  claimUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_UPDATE_CLAIM_FAILURE = (state: ClaimState) => ({
  ...state,
  claimUpdate: {
    ...state.claimUpdate,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_UPDATE_CLAIM_STATE = (state: ClaimState) => ({
  ...state,
  claimUpdate: initialState().claimUpdate,
});

/*
Update
 */
const ATTEMPT_TO_DELETE_CLAIM = (state: ClaimState) => ({
  ...state,
  claimDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_DELETE_CLAIM_SUCCEED = (state: ClaimState, action: BaseAction) => ({
  ...state,
  claimDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_DELETE_CLAIM_FAILURE = (state: ClaimState) => ({
  ...state,
  claimDelete: {
    ...state.claimDelete,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_DELETE_CLAIM_STATE = (state: ClaimState) => ({
  ...state,
  claimDelete: initialState().claimDelete,
});

const reducer = (state: ClaimState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case CLAIM_ACTIONS.ATTEMPT_TO_FETCH_CLAIM:
      return ATTEMPT_TO_FETCH_CLAIM(state);
    case CLAIM_ACTIONS.SET_FETCH_CLAIM_SUCCEED:
      return SET_FETCH_CLAIM_SUCCEED(state, action);
    case CLAIM_ACTIONS.SET_FETCH_CLAIM_FAILURE:
      return SET_FETCH_CLAIM_FAILURE(state);
    case CLAIM_ACTIONS.RESET_FETCH_CLAIM_STATE:
      return RESET_FETCH_CLAIM_STATE(state);

    case CLAIM_ACTIONS.ATTEMPT_TO_CREATE_CLAIM:
      return ATTEMPT_TO_CREATE_CLAIM(state);
    case CLAIM_ACTIONS.SET_CREATE_CLAIM_SUCCEED:
      return SET_CREATE_CLAIM_SUCCEED(state, action);
    case CLAIM_ACTIONS.SET_CREATE_CLAIM_FAILURE:
      return SET_CREATE_CLAIM_FAILURE(state);
    case CLAIM_ACTIONS.RESET_CREATE_CLAIM_STATE:
      return RESET_CREATE_CLAIM_STATE(state);

    case CLAIM_ACTIONS.ATTEMPT_TO_UPDATE_CLAIM:
      return ATTEMPT_TO_UPDATE_CLAIM(state);
    case CLAIM_ACTIONS.SET_UPDATE_CLAIM_SUCCEED:
      return SET_UPDATE_CLAIM_SUCCEED(state, action);
    case CLAIM_ACTIONS.SET_UPDATE_CLAIM_FAILURE:
      return SET_UPDATE_CLAIM_FAILURE(state);
    case CLAIM_ACTIONS.RESET_UPDATE_CLAIM_STATE:
      return RESET_UPDATE_CLAIM_STATE(state);

    case CLAIM_ACTIONS.ATTEMPT_TO_DELETE_CLAIM:
      return ATTEMPT_TO_DELETE_CLAIM(state);
    case CLAIM_ACTIONS.SET_DELETE_CLAIM_SUCCEED:
      return SET_DELETE_CLAIM_SUCCEED(state, action);
    case CLAIM_ACTIONS.SET_DELETE_CLAIM_FAILURE:
      return SET_DELETE_CLAIM_FAILURE(state);
    case CLAIM_ACTIONS.RESET_DELETE_CLAIM_STATE:
      return RESET_DELETE_CLAIM_STATE(state);
    default:
      return state;
  }
};

export default reducer;
