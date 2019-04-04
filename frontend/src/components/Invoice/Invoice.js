import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteInvoice } from '../store/actions/invoiceActions';
import '../../Dashboard.css';

class Invoice extends Component {

        onDeleteClick = (id) => {
            this.props.deleteInvoice(id);
           
        };

        render() {
        const { id, client_name, company_name, email, phone_number } = this.props.invoice;
        return (
            <div className="card white z-depth-1">
            <div className="card-content">
                <div className="card-top">
                    <a href="#">
                        <p className="right"><i className="material-icons delete-icon" onClick={this.onDeleteClick.bind(this,id)}>delete_forever</i></p>
                    </a>
                    <a href="#">
                        <p className="right card-icon-top">Edit</p>	
                    </a>
                </div>
                <Link to= {`/invoice/${id}`}>
                    <span className="card-title">INVOICE {id}</span>
                </Link>
                <p className="name-heading">{client_name}</p>
                <p className="invoice-text">{company_name}</p>
                <p className="invoice-text">{email}</p>
                <p className="invoice-text">{phone_number}</p>
                <div className="pdf-icon right">
                    <a href="#">
                    <i className="far fa-file-pdf" />
                    </a>
                </div> 
            </div>

        <div className="card-action">
            <i className="fas fa-bell" />
            <span className="reminder-text">M W F</span>
            <a href="#">
                <i className="fas fa-mail" />
            </a>
            <a href="#">
                <i className="fas fa-mobile-alt right" />
            </a>
            <a href="#">
                <i className="fas fa-envelope right" />
            </a>	
        </div> 
    </div>  
        )  
    } 
}

export default connect(null, { deleteInvoice })(Invoice);