import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import profileSaga from "./profileSaga";
import patientSaga from "./patientSaga";
import serviceSaga from "./serviceSaga";
import claimSaga from "./claimSaga";
import eftSaga from "./eftSaga";
export function* rootSaga() {
  yield all([
    authSaga(),
    profileSaga(),
    patientSaga(),
    serviceSaga(),
    claimSaga(),
    eftSaga(),
  ]);
}
