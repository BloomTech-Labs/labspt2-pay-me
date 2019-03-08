import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

/*
Kendra Williams - 3/4/16
client pay invoice screen
invoice holds: invoice number and invoice amount passed from database
*/

class PayInvoice extends Component {
   constructor(props){
      super(props)
      this.state = {
         invoice: []
      }
      //bind submit for stripe
      this.submit = this.submit.bind(this);
   }

   componentDidMount() {

   }
   
   async submit(ev) {
      //user clicked submit
   }

   //add side nav to render
   render() {
      return (
         <>
            <div>
               <h2>Invoice {this.state.invoice.number}</h2>
               <span>PDF Invoice</span>
               <p>{this.state.invoice.amount}</p>
               <div>
                  <p>Payment Info</p>
                  <div classname="checkout">
                     <CardElement />
                  </div>
                  <button onClick={this.submit}>Submit</button>
               </div>
            </div>
         </>
      )
   }
}

export default injectStripe(PayInvoice);