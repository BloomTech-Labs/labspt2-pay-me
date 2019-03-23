import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Reminders from './components/reminders/reminders'
//import PayInvoice from "./Component/PayInvoice";
import Home from './components/home/Home';
import Contact from './components/contact/contact';
import Signup from './components/authenicate/SignUp';
import SignIn from './components/authenicate/SignIn';
import ClientStripe from "./components/client/Stripe";

import Dummy from './components/dummy/Dummy';

// import AddInvoice from './components/AddInvoice';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Dummy />
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/payinvoice/:id" component={ClientStripe} />
        {/* <Route exact path="/reminders" component={Reminders} />*/}
      </div>
    );
  }
}

export default App;