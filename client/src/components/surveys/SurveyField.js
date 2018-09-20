//Contains single components
import React from "react";

//surveyField is getting passed a lot of attributes from SurveyForm

//the input is same as saying props.input
//the {...input} is saying as saying onBlur = {input.onBlur} for all attributes
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
