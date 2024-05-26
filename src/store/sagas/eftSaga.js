// @flow
import { takeLatest, put, takeEvery } from "redux-saga/effects";
import TOAST from "../../modules/toastManager";
import {
  EFT_ACTIONS,
  setCreateEftFailure,
  setCreateEftSucceed,
  setDeleteEftFailure,
  setDeleteEftSucceed,
  setFetchEftFailure,
  setFetchEftSucceed,
  setUpdateEftFailure,
  setUpdateEftSucceed,
} from "../actions/eftAction";
import { supabaseClient } from "../../config/SupabaseClient";

function* listEft(filter) {
  try {
    console.log("[Filter]", filter.payload);
    let { data, error, status } = yield supabaseClient
      .from("efts")
      .select()
      .eq("companyId", filter.payload.companyId)
      .eq("provider", filter.payload.provider)
      .gte("paid_on", `${filter.payload.from} 00:00`)
      .lt("paid_on", `${filter.payload.to} 23:59`)
      .order("paid_on", { ascending: false });

    if (error && status !== 406) {
      console.log(error.toString());
      throw error;
    }

    if (data) {
      console.log("[got me]", data);
      yield put(setFetchEftSucceed(data));
    }
  } catch (error) {
    yield put(setFetchEftFailure(error));
    TOAST.error(`Eft Failed:${error.toString()}`);
  }
}

function* createEft(rqst) {
  try {
    console.log("[createEfts]", rqst.payload);
    let { error } = yield supabaseClient.from("efts").insert(rqst.payload, {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) {
      console.log(`[create Eft] : ${error.toString()}`);
      yield put(setCreateEftFailure(`[create Eft] : ${error.toString()}`));
      throw error;
    }
    yield put(setCreateEftSucceed({ success: true }));
  } catch (error) {
    console.log(`[create Eft] : ${error.toString()}`);
    yield put(setCreateEftFailure(`[create Eft] : ${error.toString()}`));
  }
}

function* updateEft(rqst) {
  try {
    console.log("[updateEfts]", rqst.payload);
    let { error } = yield supabaseClient.from("efts").upsert(rqst.payload, {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) {
      console.log(`[update Eft] : ${error.toString()}`);
      yield put(setUpdateEftFailure(`[update Eft] : ${error.toString()}`));
      throw error;
    }
    yield put(setUpdateEftSucceed({ success: true }));
  } catch (error) {
    console.log(`[update Eft] : ${error.toString()}`);
    yield put(setUpdateEftFailure(`[update Eft] : ${error.toString()}`));
  }
}

function* deleteEft(rqst) {
  try {
    console.log("[updateEfts]", rqst.payload);
    let { error } = yield supabaseClient
      .from("efts")
      .delete()
      .match({ id: rqst.payload });

    if (error) {
      console.log(`[delete Eft] : ${error.toString()}`);
      yield put(setDeleteEftFailure(`[delete Eft] : ${error.toString()}`));
      throw error;
    }
    yield put(setDeleteEftSucceed({ success: true }));
  } catch (error) {
    console.log(`[delete Eft] : ${error.toString()}`);
    yield put(setDeleteEftFailure(`[delete Eft] : ${error.toString()}`));
  }
}

function* eftSagaWatcher<T>(): Iterable<T> {
  yield takeEvery(EFT_ACTIONS.ATTEMPT_TO_FETCH_EFT, listEft);
  yield takeLatest(EFT_ACTIONS.ATTEMPT_TO_CREATE_EFT, createEft);
  yield takeLatest(EFT_ACTIONS.ATTEMPT_TO_UPDATE_EFT, updateEft);
  yield takeLatest(EFT_ACTIONS.ATTEMPT_TO_DELETE_EFT, deleteEft);
}

export default eftSagaWatcher;
