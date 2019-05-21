import React from 'react';
import Invoice from '../Invoice/Invoice';
import '../../Main.css';

const InvoiceList = ({ invoices }) => {
    return (
        <div className="invoice-list-container">
           {invoices && invoices.map(invoice => {
               if (invoice.id === null) {
                   return (<></>)
               }
               else {
                return (
                    <Invoice invoice={invoice} key={invoice.id} />  
                )
                }
           })}
        </div>
    )
}

export default  InvoiceList;