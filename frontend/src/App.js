import React, { Component } from 'react';
import Reminders from './components/reminders/reminders'
import PayInvoice from "./components/client/PayInvoice";
import LandingPage from './components/home/LandingPage';
import Contact from './components/contact/contact';
import Signup from './components/authenicate/SignUp';
import SignIn from './components/authenicate/SignIn';
import { Route } from 'react-router-dom';
import CreateInvoice from './components/createInvoice/createInvoice';
import InvoiceEdit from './components/Invoice/InvoiceEdit';
import InvoiceDetails from './components/Invoice/InvoiceDetails';
import Billing from './components/billing/Billing';
import Dashboard from './components/dashboard/dashboard';
import Settings from './components/settings/Settings';
import Pay from './components/payInvoice/Pay';
import SideDrawer from './components/nav/SideDrawer';
import Drop from './components/nav/Backdrop';
import MobileDrawer from './components/nav/MobileDrawer';

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

  state = {
    sideDrawerOpen: false,
    mobileDrawerOpen: false
  };

  sideDrawerClickHandler = () => {
    this.setState((prevState) => {
        return {
          sideDrawerOpen: !prevState.sideDrawerOpen
        }
    })  
  };

  mobileDrawerClickHandler = () => {
    this.setState((prevState) => {
        return {
          mobileDrawerOpen: !prevState.mobileDrawerOpen
        }
    })  
  };

  sideDrawerClose = () => {
    this.setState({
        sideDrawerOpen: false
    })
  }

  mobileDrawerClose = () => {
    this.setState({
        mobileDrawerOpen: false
    })
  }
  
  render() {
    let backDrop;
    if(this.state.sideDrawerOpen || this.state.mobileDrawerOpen) {
        backDrop = <Drop />
    }
    
    return (
      <div className="App">
        <MobileDrawer show={this.state.mobileDrawerOpen} click={this.mobileDrawerClose} />
        { backDrop }
        <Route exact path="/"  render={(props) => <LandingPage {...props} open={this.mobileDrawerClickHandler}/> } />
        <Route exact path="/contact" render={(props) => <Contact {...props} open={this.mobileDrawerClickHandler}/> } />
        <Route exact path="/signup" render={(props) => <Signup {...props} open={this.mobileDrawerClickHandler}/> } />
        <Route exact path="/signin" render={(props) => <SignIn {...props} open={this.mobileDrawerClickHandler}/> } />
        <SideDrawer show={this.state.sideDrawerOpen} click={this.sideDrawerClose} />
        <Route exact path="/invoice/edit/:id" render={(props) => <InvoiceEdit {...props} open={this.sideDrawerClickHandler}/> } />
        <Route exact path="/invoice/:id" render={(props) => <InvoiceDetails {...props} open={this.sideDrawerClickHandler}/> } />
        <Route  path="/dashboard" render={(props) => <Dashboard {...props} open={this.sideDrawerClickHandler}/> } />
        <Route  path="/create" render={(props) => <CreateInvoice {...props} open={this.sideDrawerClickHandler}/> } />
        <Route  path="/billing" render={(props) => <Billing {...props} open={this.sideDrawerClickHandler}/> } />
        <Route  path="/settings" render={(props) => <Settings {...props} open={this.sideDrawerClickHandler}/> } />
        <Route  path="/payinvoice/:id" render={(props) => <Pay {...props} open={this.sideDrawerClickHandler}/> } />
        <Route exact path="/reminders" render={(props) => <Reminders {...props} open={this.sideDrawerClickHandler}/> } />
        <Route exact path="/signin/:jwt" render={(props) => <SignIn {...props}/>} />
        <Route exact path="/signin/:jwt" render={(props) => <SignIn {...props}/>} />
        {/* <Route exact path="/reminders" component={Reminders} />*/}
      </div>
    );
  }
}

export default App;
