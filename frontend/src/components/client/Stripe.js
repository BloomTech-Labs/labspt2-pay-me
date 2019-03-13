import React from "react";
import {Elements, StripeProvider} from 'react-stripe-elements';
import PayInvoice from "./PayInvoice";

class Stripe extends React.Component {
   render(){
      return (
         <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
            <div className="client_payment">
               <Elements>
                  <PayInvoice />
               </Elements>
            </div>
         </StripeProvider>
      )
   }
}

export default Stripe;