import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getInvoice } from '../store/actions/invoiceActions';
import '../../InvoiceDetails.css';

class InvoiceDetails extends Component {
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

    render () {
    const { id,invoice_number, client_name, company_name, email, phone_number, amount, notes } = this.state;
   
    return (
        <div className="outside-container">
           
            {/* Mobile Sidebar */} 
            <div className="mobile-nav-container">
                <i className="fas fa-bars" id="mobile-user-nav" onClick={this.props.open}></i> 
            </div>
            
            {/* Main content */} 
            <div className="content-container">
                <h3 className="center" style={{color: "#7795F8"}}>Invoice Details and Payment Due</h3>
                <p className="center lead-text">View the details of your ivoice</p>
                <div className="input-field center">
                        <Link to="/dashboard">
                            <button className="back-button">Go Back</button>
                        </Link>
                    </div>
                
                <div className="container">
                    <div className="row">
                        <div className="col s12 m12 l12 center">
                            <div className="card-panel z-depth-0" id="detail-card"style={{ width: "40%", marginLeft: "30%"}}>
                                <h3 className="invoice-details-content-text-light center">Invoice Details</h3>
                                <p className="center lead-text"> Invoice# {invoice_number}</p>

                                {/* Link to pay invoice page */}
                                <Link to= {`/payinvoice/${id}`}>
                                    <button className="btn blue btn-flat white-text">PAY NOW</button>
                                </Link>

                                {/* Amount Due display */}
                                <div className="amount-due-display">
                                    <h3 className="amount-due-heading-details">Amount due: ${amount}</h3>
                                </div>
                                {/* Card details */}
                                <span className="invoice-details-content-text-bold">{client_name}</span>
                                <br></br>
                                <span className="invoice-details-content-text-normal">{company_name}</span>
                                <br></br>
                                <span className="invoice-details-content-text-normal">{phone_number}</span>
                                <br></br>
                                <span className="invoice-details-content-text-normal">{email}</span>
                                <br></br>
                                
                                <p className="notes-heading">Notes:</p>
                                <p className="invoice-details-content-text-normal">{notes}</p>
                                {/* Divider */}
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
export default connect(mapStateToProps, { getInvoice })(InvoiceDetails);