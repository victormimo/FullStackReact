import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => {
  return function(dispatch) {
    axios
      .get("api/current_user") // redux thunk is responsible for being able to call dispatch
      .then(res => dispatch((type: FETCH_USER), (payload: res)));
  };
};
