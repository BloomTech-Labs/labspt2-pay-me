import React from 'react';
import Invoice from '../Invoice/Invoice';
import { Link } from 'react-router-dom';
import '../../Dashboard.css';

const InvoiceList = ({ invoices }) => {
    return (
        <div className="invoice-list-container">
           {invoices && invoices.map(invoice => {
               return (
                   <Link to={"/invoice/" + invoice.id}>
                        <Invoice invoice={invoice} key={invoice.id} />
                   </Link>
               )
           })}
        </div>
    )
}

export default  InvoiceList;