import axios from "axios"; //handles ajax requests for react-express
import { FETCH_USER } from "./types";

// remember this is new ES6 sytax - still same componoent as if it were using a return function etc.
// steps are 1. if only have 1 expression in arrow function, get rid of curly braces and return keyword
//2.
export const fetchUser = () => async dispatch => {
  //note - dispatch is actually already in react, redux-thunk just allows us to use it implicitely
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data }); // dispatch function:
};
