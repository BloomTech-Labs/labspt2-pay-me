import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import serverLoc from '../../serverLoc';
import Axios from 'axios';
import Sidenav from '../nav/Sidenav';
import './Pay.css';
import PayMeIcon from '../../img/SideNav_logo_SM.png';
import StripeCheckout from 'react-stripe-checkout';
import StripeImage from '../../img/PayMe_Stripe_Image.jpg';
import { connect } from 'react-redux';
import { getInvoice } from '../store/actions/invoiceActions';
const decode = require('jwt-decode');

class Pay extends Component {
    constructor() {
    super()
    this.state ={
        client_name: '',
        paymentAmount: '',
        invoice_number: '',
        phone_number: '',
        email: '',
        stripe_email: '',
        amount: '',
        inv_url: '',
        success: false
    }
    this.handleToken = this.handleToken.bind(this);
}
    componentWillReceiveProps(nextProps, nextState){
        const {id, client_name, company_name, phone_number, invoice_number, amount, email, inv_url, notes} = nextProps.invoice;
        this.setState({ id, client_name, invoice_number, amount, company_name, phone_number, email, inv_url, notes})
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getInvoice(id);
    };

    async handleToken (token) {
        {/* Make stripe request to the backend */}
        const response = await Axios.post("http://localhost:5000/api/charge/pay", {
            token,
            amount: this.state.amount,
            invoice_number: this.state.invoice_number,
            client_name: this.state.client_name  
        })  
        .then( ( response ) => {
            if (response.data.status === "success") {
                {/* Alert user if payment was successful */}
                this.setState({
                    success: true
                })
            }
            setTimeout(
                function() {
                this.setState({
                    succes: false
                });
                    }
                    .bind(this),
                    2000
                );
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
        const { invoice } = this.props;
        
        const { amount, invoice_number, email, company_name, phone_number, inv_url, stripe_email, client_name, success } = this.state;
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
                <h3 className="center">Pay Invoice</h3>
                <p className="center lead-text">Complete the form to securely pay your invoice with Stripe</p>
                {/* Successful payment alert */} 
                {success ? <h5 className="s10 center created-text">Hooray! Payment is successful.</h5> : ""}
                <div className="container">
                    <div className="row">
                        {/* Invoice # heading */} 
                        <h4 className="center invoice-title-heading">
                            Invoice# {invoice_number}
                        </h4>

                        {/* Download invoice link */} 
                        <a href={inv_url}>
                            <p className="center link">Download invoice</p>
                        </a>

                        {/* Invoice details heading */} 
                        <h4 className="pay-invoice-content-text-bold">
                            {company_name} 
                            <br></br>
                            <br></br>
                            <span className="pay-invoice-content-text-normal">{client_name}</span>
                            <br></br>
                            <span className=" pay-invoice-content-text-normal">{phone_number}</span>
                            <br></br>
                            <span className=" pay-invoice-content-text-normal">{email}</span>
                        </h4>
                
                        {/* Amount Due display */}
                        <div className="amount-due-display">
                            {success ? <h3 className="amount-due-heading">Amount due: <span className="amount-paid-heading">PAID</span> 
                            </h3> : <h3 className="amount-due-heading">Amount due: ${amount}</h3>}
                        </div>

                        {/* Email input for Stripe */}
                        <input type="email" placeholder="Enter your email" onblur="this.placeholder='Email'" id="stripe_email" onChange={this.handleChange} value={stripe_email} className="input-container-payment"/>

                        {/* Payment Amount input */}
                        <input type="number" placeholder="Payment Amount (USD)" onblur="this.placeholder='Payment Amount'" id="paymentAmount" onChange={this.handleChange} value={amount} className="input-container-payment"/>

                        {/* Stripe Checkout button */}
                        <StripeCheckout
                            name= "Payment for invoice"
                            description= {invoice_number}
                            email={stripe_email}
                            image={StripeImage}
                            amount = {amount * 100}
                            token= {this.handleToken}
                            stripeKey= "pk_test_wnixOvY6DQSPwEAKdhI5lEga00YSlXIbFq"
                            >
                            <button className="pay-invoice-button">Pay ${amount}</button>
                        </StripeCheckout >               
                    </div>
                    <div className="stripe-payment-text">
                        <p>Securely make a payment with stripe
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

const mapStateToProps = (state) => {
    return {
        invoice: state.invoice.invoice
    }
}
export default connect(mapStateToProps, { getInvoice })(Pay);