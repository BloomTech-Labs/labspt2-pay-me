import React from 'react';
import '../../Dashboard.css';

const InvoicePayCard = (props => {
    return (
        <div>
            <p>{props.invoice.invoice_number}</p>
            <p>{props.invoice.company_name}</p>
            <p>{props.invoice.inv_url}</p>
            <p>{props.invoice.notes}</p>
            <p>{props.invoice.amount}</p>
        </div>
    )
})

export default InvoicePayCard