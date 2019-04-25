import React from 'react';
import Invoice from '../Invoice/Invoice';
import '../../Dashboard.css';
import { Link } from 'react-router-dom';

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