import React, { Component } from 'react';
import Reminders from './components/reminders/reminders'
import {Elements, StripeProvider} from 'react-stripe-elements';
import PayInvoice from "./components/client/PayInvoice";
import Home from './components/home/Home';
import Contact from './components/contact/contact';
import Signup from './components/authenicate/SignUp';
import SignIn from './components/authenicate/SignIn';
import { Route } from 'react-router-dom';
import CreateInvoice from './components/creatInvoice/createInvoice';
import InvoiceDetails from './components/Invoice/InvoiceDetails';
import Billing from './components/billing/Billing';
import Dashboard from './components/dashboard/dashboard';
import Settings from './components/settings/Settings';

/*
<StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <div className="example">
          <h1>Pay Invoice Example</h1>
          <Elements>
            <PayInvoice />
          </Elements>
        </div>
</StripeProvider>
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/invoice/:id" component={InvoiceDetails} />
        <Route  path="/dashboard" component={Dashboard} />
        <Route  path="/create" component={CreateInvoice} />
        <Route  path="/billing" component={Billing} />
        <Route  path="/settings" component={Settings} />
        <Route exact path="/payinvoice/:id" component={PayInvoice} />
        <Route exact path="/signin/:jwt" render={(props) => <SignIn {...props}/>} />
        {<Route exact path="/reminders" component={Reminders} />}
      </div>
    );
  }
}

export default App;
