import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "materialize-css/dist/css/materialize.min.css"; //example of webpack doing loading module
import reduxThunk from "redux-thunk"; // upadtes reducers, gives access to dispatch function

import App from "./components/App";
import reducers from "./reducers";

import axios from "axios";
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); // the store we make has a Provider
//its a react component used to read changes from redux store - part of react-redux lib

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
