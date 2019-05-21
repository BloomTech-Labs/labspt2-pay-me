import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import serverLoc from '../../serverLoc';
import Axios from 'axios';
import { connect } from 'react-redux';
import { getInvoice } from '../store/actions/invoiceActions';
import '../../InvoiceDetails.css';

class InvoiceEdit extends Component {
    constructor() {
        super()
        this.state = {
            invoice_number: '',
            company_name: '',
            amount: '',
            inv_url: '',
            notes: '',
            loading: false,
            changed: false,
        };
        this.editInvoice = this.editInvoice.bind(this);
    }

    componentWillReceiveProps(nextProps, nextState){
        const {id, invoice_number, amount, company_name, inv_url, notes} = nextProps.invoice;
        this.setState({ id, invoice_number, amount, company_name, inv_url, notes})
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

    async editInvoice (event) {
        event.preventDefault();
        const response = await Axios.put(`${serverLoc}/api/invoices/${this.state.id}`, {
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
            if (res.status === 200) {
                //Display to the user that the password was successfully changed.
                this.setState({
                    loading: true
                })
                setTimeout(
                    function() {
                    this.setState({
                        loading: false,
                        changed: true
                    });
                        }
                        .bind(this),
                        2000
                    );
            } 
        })
        .catch(err => {
            console.log(err);
        })
        console.log(this.state.changed)
    }

    render () {
    const { id,invoice_number, company_name, amount, notes, loading, changed } = this.state;
   
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
                {changed ? <h5 className="update-text center" style={{marginTop: 30, marginBottom: 30}}>Invoice updated successfully</h5> : ""}

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
                                
                                    <div className="col s12 m6">
                                        <p>Invoice number:</p>
                                        <input type="number" className="white lighten-3 grey-text input-container"  id="invoice_number" onChange={this.changeValue} value={invoice_number}></input>

                                        {/* Amount Due display */}
                                        <div className="amount-due-display">
                                        <p>Amount due:</p>
                                        <input type="number" className="white lighten-3 grey-text input-container"  id="amount" onChange={this.changeValue} value={amount}></input>
                                        </div>
                                    </div>

                                    <div className="col s12 m6">
                                        <p>Notes:</p>
                                        <textarea type='text' name="notes" id="notes" className="matierialize-textarea white grey-text" value={notes} onChange={this.changeValue}/>
                                   </div>
   
                                    {/* Button */}
                                    <button className="submit-button update-button"  disabled={ loading } style={{marginLeft: 10}}>
                                    { loading && <i className="fas fa-spinner" id="loading" style={{color:"#FFF", marginRight: 10}}></i> }
                                    Update Invoice
                                    </button>
                                </form>

                                <hr className="divider" style={{marginTop: 70}}></hr>
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