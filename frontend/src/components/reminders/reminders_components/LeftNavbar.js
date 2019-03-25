import React from 'react';
import { NavLink} from "react-router-dom";

const LeftNavBar = () => {
  return (
    <div class="collection leftNav">
        <a href="#!" class="collection-item">Invoices</a>
        <a href="#!" class="collection-item active">Reminders</a>
        <a href="#!" class="collection-item">Settings</a>
        <a href="#!" class="collection-item">Billing</a>
      </div>
  );
};

LeftNavBar.defaultProps = {
  //name: '',
  //height: '',
  //age: ''
};

export default LeftNavBar;