import React, { Component } from 'react';
import Home from './components/home/Home';
import Contact from './components/contact/contact';
import Signup from './components/authenicate/SignUp';
import SignIn from './components/authenicate/SignIn';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import CreateInvoice from './components/creatInvoice/createInvoice';
import InvoiceDetails from './components/Invoice/InvoiceDetails';
import Billing from './components/billing/Billing';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route exact path="/" component={Home} />
      <Switch>
        <Route  path="/contact" component={Contact} />
        <Route  path="/signup" component={Signup} />
        <Route  path="/signin" component={SignIn} />
        <Route exact path="/invoice/:id" component={InvoiceDetails} />
        <Route  path="/dashboard" component={Dashboard} />
        <Route  path="/create" component={CreateInvoice} />
        <Route  path="/billing" component={Billing} />
        </Switch>
      </div>
    );
  }
}

export default App;
