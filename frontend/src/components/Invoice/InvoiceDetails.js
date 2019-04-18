import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getInvoice } from '../store/actions/invoiceActions';
import '../../InvoiceDetails.css';

class InvoiceDetails extends Component {
    state = {
        client_name: '',
        company_name: '',
        phone: '',
        email: '',
        inv_url: ''
    };
    componentWillReceiveProps(nextProps, nextState){
        const {id, company_name} = nextProps.invoice;
        this.setState({ id, company_name})
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getInvoice(id);
    }

    render () {
    const { id, client_name, company_name, email, phone } = this.state;
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
                        <p className="invoice-text">{company_name}</p>
                        <p className="invoice-text">{email}</p>
                        <p className="invoice-text">{phone}</p>
                        <p className="invoice-text-details">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                        </p>
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