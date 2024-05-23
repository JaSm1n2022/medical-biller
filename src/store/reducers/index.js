import { combineReducers } from "redux";
import profileReducer from "./profile";
import patientReducer from "./patient";
import serviceReducer from "./service";
import claimReducer from "./claim";
import eftReducer from "./eft";
export default combineReducers({
  profile: profileReducer,
  patient: patientReducer,
  service: serviceReducer,
  claim: claimReducer,
  eft: eftReducer,
});
