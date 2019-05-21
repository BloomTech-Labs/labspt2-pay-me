import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import serverLoc from '../../serverLoc';
import Axios from 'axios';
import Sidenav from '../nav/Sidenav';
import './Billing.css';
import PayMeIcon from '../../img/SideNav_logo_SM.png';
//import { Elements, StripeProvider, CardElement, injectStripe } from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import StripeImage from '../../img/PayMe_Stripe_Image.jpg';
const decode = require('jwt-decode');

class Billing extends Component {
    constructor() {
        super()
        this.state= {
            email: '',
            subscriptions: {
                plan: [ "Unlimited", "Single"],
                price: [20, 1.99]
            } ,
            success: false
        };
        this.handleToken = this.handleToken.bind(this);
    }

    componentDidMount() {
        {/* Get user email */}
        const token = localStorage.getItem('jwt');
        const id = decode(token).subject; // I had the user_id stored inside a subject field -Jason
        Axios.get(`${serverLoc}/auth/local/${id}`)
        .then((user) => {
            this.setState({
                // The user data is sent back as an array, could select the first item in the array server or client side -Jason
                email: user.data[0].email,
                /* 
                old_password: user.data.password
                This won't work because the user's password is hashed so we don't have the plaintext version of it
                And I have the findById designed to not select the password field. No need to send hashes back to the frontend. 
                -Jason
                */
            });
        })
        .catch((err) => {
            console.log(err)
        })
    };

    async handleToken(token) {
    {/* Make stripe request to the Stripe single client backend */}
   
        const response = await Axios.post(`${serverLoc}/api/charge`, {
            token  
        })
        .then( ( response ) => {
            if (response.data.status === "success") {
                {/* Alert user if payment was successful */}
                this.setState({
                    success: true
                })
            }
        })
      
      
    };

    async handleTokenSubscription(token) {
        {/* Make stripe request to the stripe subscription backend */}
       
            const response = await Axios.post(`${serverLoc}/api/charge/subscription`, {
                token  
            })
            .then( ( response ) => {
                {/* Alert user if payment was successful */}
                if (response.data.status === "success") {
                    this.setState({
                        success: true
                    })
                }
            })
        }

    handleChange= (e) => {
        this.setState ({
            [e.target.id]: e.target.value      
        })
    };
 
    render(){

        const token = localStorage.getItem('jwt');
        if (!token || token === 'undefined') {
            return (
                <Redirect to='/signin' />
            )
        }
        
        const { subscriptions, success } = this.state;
        console.log(subscriptions.price)

        return (
        <>
        <div className="outside-container">
            {/* Sidebar */} 
            <div className="nav-container">
                <Sidenav />
            </div>

            {/* Mobile Sidebar */} 
             <div className="mobile-nav-container">
                <i className="fas fa-bars" id="mobile-user-nav" onClick={this.props.open}></i> 
            </div>
 
            {/* Main content */} 
            <div className="content-container">
                <h3 className="center" style={{color: "#7795F8"}}>Billing and Subscriptions</h3>
                <p className="center lead-text">Choose a subscription plan to get the most from Pay Me</p>
                {/* Successful payment alert */} 
                {success ? <h5 className="s10 center created-text">Hooray! Payment is successful.</h5> : ""}
                <div className="container">
                    <div className="row">
                        {/* Unlimited card */}
                        <div className="col s12 m12 l6 center">
                            <div className="card-panel white z-depth-0 c-panel">
                                <div className="card-content">
                                    <h2 className="card-heading-plan" style={{color: "#7795F8"}}>{subscriptions.plan[0]}</h2>
                                    <p className="card-heading-price">
                                        <span className="card-heading-price">$</span>
                                        {subscriptions.price[0]}
                                        <span className="card-heading-bold">Monthly</span>
                                    </p>
                                    {/* UL List */}
                                    <ul className="collection">
                                        <li className="collection-item">Unlimited clients</li>
                                        <li className="collection-item">Send and reminders by email and text</li>
                                        <li className="collection-item">Send and recieve payments</li>
                                        <li className="collection-item">Send and recieve unlimited invoices</li>
                                    </ul>
                                
                                    {/* Stripe Checkout button for unlimited */}
                                    <StripeCheckout
                                        name= "Unlimited Subsription Plan"
                                        email={this.state.email}
                                        image={StripeImage}
                                        amount = {subscriptions.price[0] * 100}
                                        token= {this.handleTokenSubscription}
                                        stripeKey= "pk_test_wnixOvY6DQSPwEAKdhI5lEga00YSlXIbFq"
                                        >
                                        <button className="purchase-button">Purchase
                                        </button>
                                    </StripeCheckout> 
                                </div>
                            </div>         
                        </div>
                        {/* Single card */}
                        <div className="col s12 m12 l6 center">
                            <div className="card-panel white z-depth-0 c-panel">
                                <div className="card-content">
                                    <h2 className="card-heading-plan" style={{color: "#7795F8"}}>{subscriptions.plan[1]}</h2>
                                    <p className="card-heading-price">
                                        <span className="card-heading-price">$</span>
                                        {subscriptions.price[1]}
                                        <span className="card-heading-bold">Once</span>
                                    </p>
                                    {/* UL List */}
                                    <ul className="collection">
                                        <li className="collection-item">One client</li>
                                        <li className="collection-item">Send and recieve reminders by email and text</li>
                                        <li className="collection-item">Send and recieve payments</li>
                                        <li className="collection-item">Send and recieve invoices from one client</li>
                                    </ul>
                                
                                    {/* Stripe Checkout button for unlimited */}
                                    <StripeCheckout
                                        name= "Single Subscription Plan"
                                        email={this.state.email}
                                        image={StripeImage}
                                        amount = {subscriptions.price[1] * 100}
                                        token= {this.handleToken}
                                        stripeKey= "pk_test_wnixOvY6DQSPwEAKdhI5lEga00YSlXIbFq"
                                        >
                                        <button className="purchase-button">Purchase
                                        </button>
                                    </StripeCheckout> 
                                </div>
                            </div>         
                        </div>
                    </div>
                    <div className="stripe-payment-text center">
                        <p style={{marginTop: 30}}>Securely make a payment with stripe
                            <span className="stripe-payment-text"><i className="fab fa-cc-stripe"></i>
                            </span>
                        </p>
                    </div> 
                </div> 
            </div>
        </div>   
        </>                          
        )
    };
};

export default Billing;