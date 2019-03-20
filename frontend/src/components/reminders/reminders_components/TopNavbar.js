import React from 'react';
import { NavLink} from "react-router-dom";


const TopNavBar = () => {
  return (
    <nav className='Topnav'>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo">Reminders</a>
      <ul class="right hide-on-med-and-down">
        <li><a href="sass.html"><i class="material-icons left">home</i>Home</a></li>
        <li><a href="badges.html"><i class="material-icons right">sign</i>Sign out</a></li>
      </ul>
    </div>
  </nav>
  );
};

TopNavBar.defaultProps = {

};

export default TopNavBar;