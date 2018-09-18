import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}
// amount is in USD components
// token prop is token we give to stripe at the end of the process NOT the one we get from them
//console.log(process.env.REACT_APP_STRIPE_KEY);
export default connect(
  null,
  actions
)(Payments);

//export default Payments;
