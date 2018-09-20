//indexjs is acting as a combine reducers function

import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm // is form from redux form or did we choose it?
});
