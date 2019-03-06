import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../App.css';
import logo from '../../img/logo.png';

const Nav = () => {
    return (
    <nav className="transparent z-depth-0">
        <div className="container">
            <Link to="/" className="brand-logo"><img src={ logo }></img></Link>
    
            <ul className="right">
                <li><NavLink to ="/">Home</NavLink></li>
                <li><NavLink to ="/about">About</NavLink></li>
                <li><NavLink to ="/contact">Contact Us</NavLink></li>
                <li><NavLink to ="/signup">Sign Up</NavLink></li>
                <li><a href= "/signin" class="waves-effect waves-light btn"><i class="material-icons left">lock</i>Sign In</a></li>
            </ul>
        </div>
    </nav>
    )
}

export default Nav;