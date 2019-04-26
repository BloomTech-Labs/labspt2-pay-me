import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import Sidenav from '../nav/Sidenav';
import '../../Dashboard.css';
import InvoiceList from "../Invoice/InvoiceList";
import { getInvoices } from '../store/actions/invoiceActions';
import { connect } from 'react-redux';

class Dashboard extends Component {
   componentDidMount() {
       this.props.getInvoices();
       const token = localStorage.getItem('jwt');
        if (!token || token === 'undefined') {
            return (
                <Redirect to='/signin' />
            )
        }
   }

    render() {
        console.log(this.props)
        
        const { invoices } = this.props;
        return (
        <div>
            
            <div className="row">
                <Sidenav />
               
                <div className="col s10 workspace">
                    <div className="dashboard-container" style={{paddingLeft: 200}}>
                        <InvoiceList invoices={invoices} />
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

export default connect(mapStateToProps, {getInvoices})(Dashboard);