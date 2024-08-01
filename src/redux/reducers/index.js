import { combineReducers } from "redux";

import authReducer from "./auth.reducer/auth.reducer";
import modalReducer from "./modal.reducers/modal.reducer";
import breakReducer from "./break.reducer/break.reducer";
import userReducer from "./user.reducer/user.reducer";
// import { clockReducer } from "./clock.reducer/clock.reducer";
import clockReducer from "./clock.reducer/clock.reducer";
const rootReducer = combineReducers({
  authReducer: authReducer,
  modalReducer: modalReducer,
  breakReducer: breakReducer,
  userReducer: userReducer,
  clock: clockReducer,
});

export default rootReducer;
