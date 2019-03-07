import React from "react";

/*
Kendra Williams - 3/4/16
client pay invoice screen
invoice holds: invoice number and invoice amount passed from database
*/

class PayInvoice extends React.component {
   constructor(props){
      super(props)
      this.state = {
         invoice: []
      }
   }

   componentDidMount() {

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
                  {/* stripe for payment submission */}
               </div>
            </div>
         </>
      )
   }
}

export default PayInvoice