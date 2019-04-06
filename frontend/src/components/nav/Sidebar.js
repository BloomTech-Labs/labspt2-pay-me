import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import '../../App.css';

class Sidebar extends Component {
    render() {
      let drawerClass = "drawer";
      if (this.props.show) {
          drawerClass = "drawer open";
      }
        return (
            <div>
                <div className= { drawerClass }>
                    <a href="#"><i class="material-icons right sidenav-icon">close</i></a>
                    <ul className="sidenav-text">
                    <li><NavLink to ="/">Home</NavLink></li>
                    <li><NavLink to ="/contact">Contact Us</NavLink></li>
                    <li><NavLink to ="/signup">Sign Up</NavLink></li>
                    <li><a href= "/signin" class="btn blue lighten-2 z-depth-0 "><i class="material-icons left">lock</i>Sign In</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar;