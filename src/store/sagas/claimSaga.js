// @flow
import { takeLatest, put, takeEvery } from "redux-saga/effects";
import TOAST from "../../modules/toastManager";
import {
  CLAIM_ACTIONS,
  setCreateClaimFailure,
  setCreateClaimSucceed,
  setDeleteClaimFailure,
  setDeleteClaimSucceed,
  setFetchClaimFailure,
  setFetchClaimSucceed,
  setUpdateClaimFailure,
  setUpdateClaimSucceed,
} from "../actions/claimAction";
import { supabaseClient } from "../../config/SupabaseClient";

function* listClaim(filter) {
  try {
    console.log("[Filter]", filter.payload);
    let { data, error, status } = yield supabaseClient
      .from("claims")
      .select()
      .eq("companyId", filter.payload.companyId);

    if (error && status !== 406) {
      console.log(error.toString());
      throw error;
    }

    if (data) {
      console.log("[got me]", data);
      yield put(setFetchClaimSucceed(data));
    }
  } catch (error) {
    yield put(setFetchClaimFailure(error));
    TOAST.error(`Claim Failed:${error.toString()}`);
  }
}

function* createClaim(rqst) {
  try {
    console.log("[createClaims]", rqst.payload);
    let { error } = yield supabaseClient.from("claims").insert([rqst.payload], {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) {
      console.log(`[create Claim] : ${error.toString()}`);
      yield put(setCreateClaimFailure(`[create Claim] : ${error.toString()}`));
      throw error;
    }
    yield put(setCreateClaimSucceed({ success: true }));
  } catch (error) {
    console.log(`[create Claim] : ${error.toString()}`);
    yield put(setCreateClaimFailure(`[create Claim] : ${error.toString()}`));
  }
}

function* updateClaim(rqst) {
  try {
    console.log("[updateClaims]", rqst.payload);
    let { error } = yield supabaseClient.from("claims").upsert(rqst.payload, {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) {
      console.log(`[update Claim] : ${error.toString()}`);
      yield put(setUpdateClaimFailure(`[update Claim] : ${error.toString()}`));
      throw error;
    }
    yield put(setUpdateClaimSucceed({ success: true }));
  } catch (error) {
    console.log(`[update Claim] : ${error.toString()}`);
    yield put(setUpdateClaimFailure(`[update Claim] : ${error.toString()}`));
  }
}

function* deleteClaim(rqst) {
  try {
    console.log("[updateClaims]", rqst.payload);
    let { error } = yield supabaseClient
      .from("claims")
      .delete()
      .match({ id: rqst.payload });

    if (error) {
      console.log(`[delete Claim] : ${error.toString()}`);
      yield put(setDeleteClaimFailure(`[delete Claim] : ${error.toString()}`));
      throw error;
    }
    yield put(setDeleteClaimSucceed({ success: true }));
  } catch (error) {
    console.log(`[delete Claim] : ${error.toString()}`);
    yield put(setDeleteClaimFailure(`[delete Claim] : ${error.toString()}`));
  }
}

function* claimSagaWatcher<T>(): Iterable<T> {
  yield takeEvery(CLAIM_ACTIONS.ATTEMPT_TO_FETCH_CLAIM, listClaim);
  yield takeLatest(CLAIM_ACTIONS.ATTEMPT_TO_CREATE_CLAIM, createClaim);
  yield takeLatest(CLAIM_ACTIONS.ATTEMPT_TO_UPDATE_CLAIM, updateClaim);
  yield takeLatest(CLAIM_ACTIONS.ATTEMPT_TO_DELETE_CLAIM, deleteClaim);
}

export default claimSagaWatcher;
