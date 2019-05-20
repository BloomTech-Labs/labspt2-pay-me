import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import serverLoc from '../../serverLoc';
import axios from 'axios';
import { connect } from 'react-redux';
import { getInvoice } from '../store/actions/invoiceActions';
import '../../InvoiceDetails.css';

class InvoiceEdit extends Component {
    state = {
        invoice_number: '',
        client_name: '',
        company_name: '',
        phone_number: '',
        email: '',
        amount: '',
        inv_url: '',
        notes: ''
    };

    componentWillReceiveProps(nextProps, nextState){
        const {id, invoice_number, client_name, amount, company_name, phone_number, email, inv_url, notes} = nextProps.invoice;
        this.setState({ id, invoice_number, client_name, amount, company_name, phone_number, email, inv_url, notes})
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getInvoice(id);
    }

    changeValue = (e) => {
        this.setState ({
            [e.target.id]: e.target.value      
        })
    };

    editInvoice = (event) => {
        event.preventDefault();
        axios.put(`${serverLoc}/api/invoices/${this.state.id}`, 
        {
            notes: this.state.notes,
            invoice_number: this.state.invoice_number,
            company_name: this.state.company_name,
            amount: this.state.amount
        }, {
            headers: {
                Authorization: localStorage.getItem('jwt'),
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render () {
    const { id,invoice_number, client_name, company_name, email, phone_number, amount, notes, loading } = this.state;
   
    return (
        <div className="outside-container">

            {/* Mobile Sidebar */} 
            <div className="mobile-nav-container">
                <i className="fas fa-bars" id="mobile-user-nav" onClick={this.props.open}></i> 
            </div>
 
            {/* Main content */} 
            <div className="content-container">
                <h3 className="center" style={{color: "#7795F8"}}>Update Invoice</h3>
                <p className="center lead-text">To make changes to your invoice. Fill out the form below.</p>
                
                <div className="col s12">
                    <div className="input-field center">
                        <Link to="/dashboard">
                            <button className="back-button">Go Back</button>
                        </Link>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <h3 className="change-password-text">Update Client Invoice</h3>

                                <form onSubmit={ this.editInvoice }>
                                
                                    <div className="offset-s4">
                                        <p>Invoice number:</p>
                                        <input type="number" className="white lighten-3 grey-text input-container"  id="invoice_number" onChange={this.changeValue} value={invoice_number}></input>

                                        {/* Amount Due display */}
                                        <div className="amount-due-display">
                                        <p>Amount due:</p>
                                        <input type="number" className="white lighten-3 grey-text input-container"  id="amount" onChange={this.changeValue} value={amount}></input>
                                        </div>

                                        <p>Company name:</p>
                                        <input type="text" className="white lighten-3 grey-text input-container"  id="company_name" onChange={this.changeValue} value={company_name}></input>

                                    </div>
                                    <label>Notes</label><br />
                                    <textarea type='text' name="notes" id="notes" className="matierialize-textarea white grey-text" value={notes} onChange={this.changeValue}/>
                                
                                    
                                    {/* Button */}
                                    <button className="submit-button update-button"  disabled={ loading }>
                                    { loading && <i className="fas fa-spinner" id="loading" style={{color:"#FFF", marginRight: 10}}></i> }
                                    Update Invoice
                                    </button>
                                </form>

                                <hr className="divider"></hr>
                            </div>
                        </div>
                    </div>      
                </div>
            </div>
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        invoice: state.invoice.invoice
    }
}
export default connect(mapStateToProps, { getInvoice })(InvoiceEdit);