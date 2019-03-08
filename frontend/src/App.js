import React, { Component } from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import PayInvoice from "./Component/PayInvoice";

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <div className="example">
          <h1>Pay Invoice Example</h1>
          <Elements>
            <PayInvoice />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default App;
