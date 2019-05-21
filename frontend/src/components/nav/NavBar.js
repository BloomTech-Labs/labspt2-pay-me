import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../home/landingPage.css';
import logo from '../../img/logo.png';

const NavBar = (props) => {
    return (
    <nav className="transparent z-depth-0">
        <div className="container" style={{marginTop: 5}}>
            <Link to="/" className="brand-logo responsive-img"><img src={ logo }></img></Link>
            
            <ul className="right hide-on-med-and-down navbar">
                <li><NavLink to ="/">Home</NavLink></li>
                <li><NavLink to ="/contact">Contact Us</NavLink></li>

                <li><NavLink to ="/signin">
                    <a className="btn z-depth-0 blue-text signin-btn"><i className="material-icons left" style={{color: "#1e90ff"}}>lock</i>Log In</a>
                </NavLink></li> 

                <li><NavLink to ="/signup">
                    <a className="btn z-depth-0 white-text signup-btn"><i className="material-icons left" style={{color: "#FFF"}}>create</i>Sign Up</a>
                </NavLink></li>
            </ul>
        </div>
    </nav>
    )
}

export default NavBar;