//SurveyNew shoes SurveyForm

import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  //need to review state components React
  //1a below
  /*
  constructor(props){
    super(props);

    this.state = {new:true};
  } */

  //below piece of code same as 1a
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview />;
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default SurveyNew;
