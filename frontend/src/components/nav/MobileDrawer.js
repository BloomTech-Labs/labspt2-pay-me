import React, {Component} from "react";
import { Link, NavLink } from 'react-router-dom';
import './SideDrawer.css';
import logo from '../../img/logo_SM.png';

class mobileDrawer extends Component {

render () {
    let drawerClasses = "side-drawer";
    if (this.props.show) {
        drawerClasses = "side-drawer open";
    }
return (
    <div className={drawerClasses}>
        <i className="fas fa-window-close right" onClick={this.props.click} style={{color:"#fff", marginTop: "15px", marginRight:15}}></i>
        <div className="logo">
            <img src={ logo } style={{ marginTop: "30px"}}></img>
        </div>
       
        <ul style={{ marginTop: "50px"}}>
            <Link to="/">
                <li><i className="material-icons left">home</i>HOME</li>
            </Link>
            <Link to="/contact">
                <li><i className="material-icons left">message</i>CONTACT US</li>
            </Link>
            <Link to="/signin">
                <li><i className="material-icons left">lock</i>LOG IN</li>
            </Link>
            <Link to="/signup">
                <li><i className="material-icons left">home</i>SIGN UP</li>
            </Link>
        </ul>
    </div>
    
    )
    }
}
export default mobileDrawer;