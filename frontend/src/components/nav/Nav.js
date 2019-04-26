import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../App.css';
import logo from '../../img/logo.png';

const Nav = () => {
    return (
    <nav className="transparent z-depth-0" style={{paddingTop: 10}}>
        <div className="container">
            <Link to="/" className="brand-logo responsive-img"><img src={ logo }></img></Link>
            
            <ul className="right hide-on-med-and-down">
                <li><NavLink to ="/">Home</NavLink></li>
                <li><NavLink to ="/contact">Contact Us</NavLink></li>
                <li><NavLink to ="/signup">Sign Up</NavLink></li>
                <li><a href= "/signin" class="btn blue lighten-2 z-depth-0 "><i class="material-icons left">lock</i>Sign In</a></li>
            </ul>
        </div>
    </nav>
    )
}

export default Nav;