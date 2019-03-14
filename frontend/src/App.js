import React, { Component } from 'react';

import Home from './components/home/Home';
import Contact from './components/contact/contact';
import Signup from './components/authenicate/SignUp';
import SignIn from './components/authenicate/SignIn';
import ClientStripe from "./components/client/Stripe";
import { Route } from 'react-router-dom';

// import AddInvoice from './components/AddInvoice';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/payinvoice" component={ClientStripe} />
      </div>
    );
  }
}

export default App;