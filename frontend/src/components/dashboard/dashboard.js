import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Sidenav from '../nav/Sidenav';
import './Dashboard.css';
import InvoiceList from "../Invoice/InvoiceList";
import { getInvoices } from '../store/actions/invoiceActions';
import { connect } from 'react-redux';
import PayMeIcon from '../../img/SideNav_logo_SM.png';


class Dashboard extends Component {
    
   componentDidMount() {
       this.props.getInvoices();
       const token = localStorage.getItem('jwt');
        if (!token || token === 'undefined') {
            return (
                <Redirect to='/signin' />
            )
        }
   };

    render() {
        const { invoices } = this.props;
        
        return (
         <>
         <div className="outside-container">
            {/* Sidebar */} 
            <div className="nav-container">
                <Sidenav />
            </div>
            
            {/* Mobile Sidebar */} 
            <div className="mobile-nav-container">
                <i className="fas fa-bars" id="mobile-user-nav" onClick={this.props.open}></i> 
            </div>
 
            <div className="content-container">
            <h3 className="center" style={{color: "#7795F8"}}>Current Invoices</h3>
                <p className="center lead-text">Here you can view, edit, delete or pay on your invoice</p>
                <InvoiceList invoices={invoices} /> 
            </div>
        </div>
         </>   
        )
    }
}

const mapStateToProps = (state) => {
    return {
        invoices: state.invoice.invoices
    }
}

export default connect(mapStateToProps, {getInvoices})(Dashboard);