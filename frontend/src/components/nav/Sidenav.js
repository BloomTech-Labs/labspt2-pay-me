import React, { Component } from "react";
import { Link, NavLink, Redirect } from 'react-router-dom';
import '../../Dashboard.css';
import logo from '../../img/logo.png';

class Sidenav extends Component {

    logout = () => {
        localStorage.removeItem('jwt');
        this.forceUpdate();
    }

    render() {
        const token = localStorage.getItem('jwt');
        if (!token || token === 'undefined') {
            return (
                <Redirect to='/signin' />
            )
        }

        return (
            <div className="col s2 blue">
                <div className="white-text sidebar fixed">
                    <div className="logo-container"><img src={ logo }></img></div>
                    <button className="btn blue add-btn " onClick={this.logout}>Logout</button>
                    <ul>
                        <Link to="/dashboard"><li>INVOICES</li></Link>
                        <Link to="/reminders"><li>REMINDERS</li></Link>
                        <Link to="/settings"><li>ACCOUNT AND SETTINGS</li></Link>
                        <Link to="/billing"><li>BILLINGS</li></Link>
                        <Link to="#"><li>SUPPORT CENTER</li></Link>
                    </ul>
                    <div className="add-invoiceBtn-container-text">NEW INVOICE</div>
                    <div className="add-invoiceBtn-container">
                            <Link to="/create">
                                <i className="material-icons left add-circle">add_circle</i>
                            </Link>
                            <br />   
                        </div>
                </div>
            </div>
        )
    }
}

export default Sidenav;