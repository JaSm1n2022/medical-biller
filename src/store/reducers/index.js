import { combineReducers } from "redux";
import profileReducer from "./profile";
import patientReducer from "./patient";
import serviceReducer from "./service";
import claimReducer from "./claim";
export default combineReducers({
  profile: profileReducer,
  patient: patientReducer,
  service: serviceReducer,
  claim: claimReducer,
});
