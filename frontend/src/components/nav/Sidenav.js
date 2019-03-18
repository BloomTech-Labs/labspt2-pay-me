import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import '../../Dashboard.css';
import logo from '../../img/logo.png';

class Sidenav extends Component {
    render() {
     
        return (
            <div className="col s2 blue">
                <div className="white-text sidebar">
                    <div className="logo-container"><img src={ logo }></img></div>
                    <p className="signout-text">Sign Out <br />
                        <span className="user_name">Hi Lisa Roy!</span>
                    </p>
                    <ul>
                        <Link to="/dashboard"><li>INVOICES</li></Link>
                        <Link to="#"><li>REMINDERS</li></Link>
                        <Link to="#"><li>ACCOUNT AND SETTINGS</li></Link>
                        <Link to="/billing"><li>BILLINGS</li></Link>
                        <Link to="#"><li>SUPPORT CENTER</li></Link>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidenav;