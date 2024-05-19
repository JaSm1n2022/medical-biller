// @flow
import { takeLatest, put, takeEvery } from "redux-saga/effects";
import TOAST from "../../modules/toastManager";
import {
  SERVICE_ACTIONS,
  setCreateServiceFailure,
  setCreateServiceSucceed,
  setDeleteServiceFailure,
  setDeleteServiceSucceed,
  setFetchServiceFailure,
  setFetchServiceSucceed,
  setUpdateServiceFailure,
  setUpdateServiceSucceed,
} from "../actions/serviceAction";
import { supabaseClient } from "../../config/SupabaseClient";

function* listService(filter) {
  try {
    console.log("[Filter]", filter.payload);
    let { data, error, status } = yield supabaseClient
      .from("services")
      .select()
      .eq("companyId", filter.payload.companyId);

    if (error && status !== 406) {
      console.log(error.toString());
      throw error;
    }

    if (data) {
      console.log("[got me]", data);
      yield put(setFetchServiceSucceed(data));
    }
  } catch (error) {
    yield put(setFetchServiceFailure(error));
    TOAST.error(`Service Failed:${error.toString()}`);
  }
}

function* createService(rqst) {
  try {
    console.log("[createServices]", rqst.payload);
    let { error } = yield supabaseClient
      .from("services")
      .insert([rqst.payload], {
        returning: "minimal", // Don't return the value after inserting
      });

    if (error) {
      console.log(`[create Service] : ${error.toString()}`);
      yield put(
        setCreateServiceFailure(`[create Service] : ${error.toString()}`)
      );
      throw error;
    }
    yield put(setCreateServiceSucceed({ success: true }));
  } catch (error) {
    console.log(`[create Service] : ${error.toString()}`);
    yield put(
      setCreateServiceFailure(`[create Service] : ${error.toString()}`)
    );
  }
}

function* updateService(rqst) {
  try {
    console.log("[updateServices]", rqst.payload);
    let { error } = yield supabaseClient.from("services").upsert(rqst.payload, {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) {
      console.log(`[update Service] : ${error.toString()}`);
      yield put(
        setUpdateServiceFailure(`[update Service] : ${error.toString()}`)
      );
      throw error;
    }
    yield put(setUpdateServiceSucceed({ success: true }));
  } catch (error) {
    console.log(`[update Service] : ${error.toString()}`);
    yield put(
      setUpdateServiceFailure(`[update Service] : ${error.toString()}`)
    );
  }
}

function* deleteService(rqst) {
  try {
    console.log("[updateServices]", rqst.payload);
    let { error } = yield supabaseClient
      .from("services")
      .delete()
      .match({ id: rqst.payload });

    if (error) {
      console.log(`[delete Service] : ${error.toString()}`);
      yield put(
        setDeleteServiceFailure(`[delete Service] : ${error.toString()}`)
      );
      throw error;
    }
    yield put(setDeleteServiceSucceed({ success: true }));
  } catch (error) {
    console.log(`[delete Service] : ${error.toString()}`);
    yield put(
      setDeleteServiceFailure(`[delete Service] : ${error.toString()}`)
    );
  }
}

function* serviceSagaWatcher<T>(): Iterable<T> {
  yield takeEvery(SERVICE_ACTIONS.ATTEMPT_TO_FETCH_SERVICE, listService);
  yield takeLatest(SERVICE_ACTIONS.ATTEMPT_TO_CREATE_SERVICE, createService);
  yield takeLatest(SERVICE_ACTIONS.ATTEMPT_TO_UPDATE_SERVICE, updateService);
  yield takeLatest(SERVICE_ACTIONS.ATTEMPT_TO_DELETE_SERVICE, deleteService);
}

export default serviceSagaWatcher;
