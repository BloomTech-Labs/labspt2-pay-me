import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import './SideNav.css';
import logo from '../../img/logo_SM.png';

class Sidenav extends Component {

    logout = () => {
        console.log("Sign out")
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
            <div className="side-nav hide-on-med-and-down" id="sidenav">
                <div className="white-text sidenav-wrapper">
                    <div className="container">
                        <div className="logo">
                            <img src={ logo } style={{ marginTop: "40px"}}></img>
                        </div>
                        <ul style={{ marginTop: "40px"}}>
                            <Link to="/dashboard">
                                <li><i className="material-icons left">description</i>INVOICES</li>
                            </Link>
                            <Link to="/reminders">
                                <li><i className="material-icons left">notifications</i>REMINDERS</li>
                            </Link>
                            <Link to="/settings">
                                <li><i className="material-icons left">settings</i>SETTINGS</li>
                            </Link>
                            <Link to="/billing">
                                <li><i className="material-icons left" >account_balance</i>BILLING</li>
                            </Link>
                            <Link to= "#">
                                <li onClick={this.logout}><i className="material-icons left">reply_all</i>SIGN OUT</li>
                            </Link>
                         
                        </ul>

                        <Link to= "/create">
                            <button className="btn-small white blue-text z-depth-0" id="button-create-invoice" style={{width: "150px", height: "50px", fontSize: "14px", fontWeight: "bold"}}> NEW INVOICE </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidenav;