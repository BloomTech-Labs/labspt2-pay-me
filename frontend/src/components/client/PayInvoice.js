import React from "react";
import React, {Component} from 'react';
import {CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';
import {NavLink} from "react-router-dom";

/*
Kendra Williams - 3/4/16
client pay invoice screen
invoice holds: invoice number and invoice amount passed from database
*/

class PayInvoice extends Component {
   constructor(props){
      super(props)
      this.state = {
         invoice: [],
         complete: false
      }
      //bind submit for stripe
      this.submit = this.submit.bind(this);
   }

   componentDidMount() {

   }
   
   async submit(ev) {
      //user clicked submit
      console.log("submit clicked");
      let {token} = await this.props.stripe.createToken({name: "Name"});
      console.log("token created");
      let response = await fetch("/charge", {
         method: "POST",
         headers: {"Content-Type": "text/plain"},
         body: token.id
      });

      console.log(response);
      if (response.ok) this.setState({complete: true});
   }

   //add side nav to render
   render() {
      return (
         <>
            <div>
               <h2>Invoice {this.state.invoice.number}</h2>
               <span>PDF Invoice</span>
               {/* <NavLink to="{this.state.invoice.pdf}">
                  <i class="fas fa-link"></i>
               </NavLink> */}
               <p>{this.state.invoice.amount}</p>
               <div>
                  <p>Payment Info</p>
                  <div className="checkout">
                     <CardNumberElement />
                     <CardExpiryElement />
                     <CardCVCElement />
                  </div>
                  <button onClick={this.submit}>Submit</button>
               </div>
            </div>
         </>
      )
   }
}

export default injectStripe(PayInvoice);