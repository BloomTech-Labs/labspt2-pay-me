import React from "react";
import {Elements, StripeProvider} from 'react-stripe-elements';
import axios from "axios";
import PayInvoice from "./PayInvoice";

class Stripe extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         invoice: null
      };
   }

   componentDidMount() {
      const id = this.props.match.params.id;
      this.getInvoice(id);
   }

   getInvoice = id => {
      axios
         .get(`http://localhost/api/invoices/${id}`)
         .then(response => {
            console.log(response.data)
            this.setState ({invoice: response.data});
         })
         .catch(err => {
            console.log(err);
         });
   }

   render(){
      /*if the client does not have an associated invoice
         otherwise load their open invoice
      */
      // if(!this.state.invoice) {
      //    return (
      //       <div className="background">
      //          No Invoice Found
      //       </div>
      //    )
      // }
      return (
         <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
            <div className="client_payment">
               <Elements>
                  <PayInvoice invoice={this.state.invoice}/>
               </Elements>
            </div>
         </StripeProvider>
      )
   }
}

export default Stripe;