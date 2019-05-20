import React, {Component} from "react";
import { Link, NavLink } from 'react-router-dom';
import './SideDrawer.css';
import logo from '../../img/logo_SM.png';

class sideDrawer extends Component {

    logout = () => {
        console.log("Sign out")
        localStorage.removeItem('jwt');
        this.forceUpdate();
    }

render () {
    let drawerClasses = "side-drawer";
    if (this.props.show) {
        drawerClasses = "side-drawer open";
    }
return (
    <div className={drawerClasses}>
        <i className="fas fa-window-close right" onClick={this.props.click} style={{color:"#fff", marginTop: "15px", marginRight:15}}></i>
        <div className="logo">
            <img src={ logo } style={{ marginTop: "10px"}}></img>
        </div>
       
        <ul style={{ marginTop: "40px"}}>
            <Link to="/dashboard">
                <li><i className="material-icons left">description</i>INVOICES</li>
            </Link>
            <Link to="/create">
                <li><i className="material-icons left" >add</i>CREATE INVOICE</li>
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
    </div>
    
    )
    }
}
export default sideDrawer;