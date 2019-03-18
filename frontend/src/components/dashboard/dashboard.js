import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Sidenav from '../nav/Sidenav';
import '../../Dashboard.css';
import InvoiceList from "../Invoice/InvoiceList";
import { connect } from 'react-redux';

class Dashboard extends Component {
    render() {
        console.log(this.props)
        const { invoices } = this.props;
        return (
        <div>
            <div className="row">
                <Sidenav />
                
                <div className="col s10 workspace">
                    <div className="dashboard-container">
                    <div className="add-invoiceBtn-container">
                    <Link to="/create">
                        <button className="btn-large blue add-btn"><i className="material-icons left">add_circle</i>Create New Invoice</button>
                            <InvoiceList invoices={invoices} />
                    </Link>
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
        invoices: state.invoice.invoices
    }
}

export default connect(mapStateToProps)(Dashboard);