import React, { Component } from 'react';

import './reminders_components/reminder.css';


import {Route} from "react-router-dom";

// Importing bootstrap
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap';

// Importing Components

import LeftNavBar from './reminders_components/LeftNavbar';
import TopNavbar from './reminders_components/TopNavbar';
import Textarea from './reminders_components/Textarea';
import Searchbar from './reminders_components/Searchbar';
import ReminderSection from './reminders_components/ReminderSection';


class Reminders extends Component {
  constructor(){
    super()
    this.state={
      data :[]
  }
  }
  render() {
    return (
      <div class="reminder">
    <div class="row"><Route  path="/" render={() =><TopNavbar />}/> </div>
<div class="row">
     
  <div class="col s12 m4 l2 navleft"> 
  <Route  path="/" render={() =><LeftNavBar />}/>           
  </div>

  <div class="col s12 m8 l10 reminderform"> 
  
  <div class="col s12 m4 l3 searchsection"> 
  <Route  path="/" render={() =><Searchbar />}/>           
  </div>
  
  <div class="col s12 m4 l9 reminder-sms-email"> 
  <Route  path="/" render={() =><ReminderSection />}/>           
  </div>
   


  </div>

</div>
    </div>
    );
  }
}

export default Reminders;

  