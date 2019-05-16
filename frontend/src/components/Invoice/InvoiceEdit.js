import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getInvoice } from '../store/actions/invoiceActions';
import '../../InvoiceDetails.css';
import serverLoc from '../../serverLoc';
import axios from 'axios';

class InvoiceEdit extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            client_name: '',
            company_name: '',
            phone: '',
            email: '',
            inv_url: '',
            notes: ''
        };
    }
    componentWillReceiveProps(nextProps, nextState){
        const {id, company_name, phone, email, inv_url, notes} = nextProps.invoice;
        this.setState({ id, company_name, phone, email, inv_url, notes})
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getInvoice(id);
    }

    onChange = (event) => {
        event.preventDefault();
        console.log(event.target.name)
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    editInvoice = (event) => {
        event.preventDefault();
        axios.put(`${serverLoc}/api/invoices/${this.state.id}`, 
        {
            notes: this.state.notes,
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
    const { id, client_name, company_name, email, phone, notes } = this.state;
    return (
        <div className="background">
            <div className="container invoice-details-container">
                <div className="col s12">
                    <div className="input-field center">
                    <Link to="/dashboard">
                        <button className="btn-large blue add-btn"><i className="material-icons white-text left">arrow_back</i>Back</button>
                    </Link>
                    </div>
                    <div className="card z-depth-0 details">
                        <div className="card-content">
                        <span className="card-title">INVOICE {id}</span>
                        <p className="name-heading">{client_name}</p>
                        <label>Company Name</label>
                        <p className="invoice-text">{company_name}</p>
                        <label>Email</label>
                        <p className="invoice-text">{email}</p>
                        <p className="invoice-text">{phone}</p>
                        <form className="create-invoice-form z-depth-0" onSubmit={this.editInvoice}>
                        <label>Notes</label><br />
                        <input type='multiline' name="notes" className="invoice-text-details" value={this.state.notes} onChange={this.onChange}/>
                        <br /><br />
                        <button type='submit'>Submit</button>
                        </form>
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