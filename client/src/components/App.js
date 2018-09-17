//initiallly rsponsible all view layer. top lay er index.js is responsible for data layer
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

//class component, we refactored because that way we can have an automatic method to run it right after its started
class App extends Component {
  componentDidMount() {
    // this is called right after this component is rendered to the screen
    this.props.fetchUser(); // 1(a)
  }

  //browser router only takes one child compnent ie first div
  //        materialize assumes you have this.. in order to make it scalable
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App); //what this is saying is that actions is importing a function and its immediately calling App when called
//all actions will be called inside App
//last thing, once actions is called with App, call the actions become props to App, whch is how we arrive at 1(a)
