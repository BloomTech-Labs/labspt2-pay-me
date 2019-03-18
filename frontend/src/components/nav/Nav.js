import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import '../../App.css';
import logo from '../../img/logo.png';
import Sidebar from '../nav/Sidebar'

class Nav extends Component {
    state = {
        sideBarOpen: false
    }

    openSideBar = () => {
        this.setState((prevState) => {
            return {
                sideBarOpen: !prevState.sideBarOpen
            };
        });
    }

    closeSideBar = () => {
        this.setState({
            sideBarOpen: false
        });
    }
    render() {
     
    return (
    <div>
        <Sidebar show={ this.state.sideBarOpen } click= { this.state.sideBarOpen } />
        <nav className="transparent z-depth-0">
            <div className="container">
                <Link to="/" className="brand-logo"><img src={ logo }></img></Link>

                <a href="#" class="sidenav-trigger" onClick={ this.openSideBar }><i class="material-icons">menu</i></a>

                <ul className="right hide-on-med-and-down">
                    <li><NavLink to ="/">Home</NavLink></li>
                    <li><NavLink to ="/contact">Contact Us</NavLink></li>
                    <li><NavLink to ="/signup">Sign Up</NavLink></li>
                    <li><NavLink to= "/signin" class="btn blue lighten-2 z-depth-0 "><i class="material-icons left">lock</i>Sign In</NavLink></li>
                </ul>
            </div>
        </nav>
        
    </div>
    )
}
}
export default Nav;