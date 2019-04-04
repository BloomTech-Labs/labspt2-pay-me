import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import '../../Dashboard.css';
import logo from '../../img/logo.png';

class Sidenav extends Component {
    render() {
     
        return (
            <div className="col s2 blue">
                <div className="white-text sidebar fixed">
                    <div className="logo-container"><img src={ logo }></img></div>
                    <ul>
                        <Link to="/dashboard"><li>INVOICES</li></Link>
                        <Link to="#"><li>REMINDERS</li></Link>
                        <Link to="/settings"><li>ACCOUNT AND SETTINGS</li></Link>
                        <Link to="/billing"><li>BILLINGS</li></Link>
                        <Link to="#"><li>SUPPORT CENTER</li></Link>
                    </ul>
                    <div className="add-invoiceBtn-container">
                            <Link to="/create">
                                <button className="btn blue add-btn"><i className="material-icons left">add_circle</i>New Invoice</button>
                            </Link>
                        </div>
                </div>
            </div>
        )
    }
}

export default Sidenav;