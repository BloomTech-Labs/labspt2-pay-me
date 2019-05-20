import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteInvoice } from '../store/actions/invoiceActions';
import './Invoice.css';

class Invoice extends Component {

        onDeleteClick = (id) => {
            this.props.deleteInvoice(id);
        };

        render() {
        const { id, amount, invoice_number, client_name, company_name, email, phone_number, inv_url } = this.props.invoice;
        return (
            <div className="card-panel white z-depth-0 invoice-card">
                <div className="card-content">
                    <div className="card-top">
                        <Link to= "/dashboard">   
                            <p className="right"><i className="fas fa-trash-alt card-icon" onClick={this.onDeleteClick.bind(this,id)}></i></p>
                        </Link>
                        <Link to= {`/invoice/edit/${id}`}>
                            <p className="right" style={{marginRight: 10}}><i className="fas fa-pencil-alt card-icon" ></i></p>
                        </Link>
                    </div>

                    {/* Link to invoice details page */}
                    <Link to= {`/invoice/${id}`}>
                        <span className="invoice-number-heading">INVOICE # {invoice_number}</span>
                    </Link>
                    <p className="invoice-company-heading">{company_name}</p>
                    <p className="invoice-name-heading">{client_name}</p>
                    <p className="invoice-content-text">{email}</p>
                    <p className="invoice-content-text">{phone_number}</p>

                    <h4 className="invoice-amount-due-heading">Amount Due: ${amount}</h4>
                    {/* Link to pay invoice page */}
                    <Link to= {`/payinvoice/${id}`}>
                        <button className="btn blue white-text z-depth-0 pay-button"> PAY</button>
                    </Link>

                    {/* Download PDF file */}
                    <div className="pdf-icon right">
                        <a href={inv_url}>
                            <i class="fas fa-file-download" id="file-download"></i>
                        </a>
                    </div> 
            </div> 
        </div>  
        )  
    } 
}

export default connect(null, { deleteInvoice })(Invoice);