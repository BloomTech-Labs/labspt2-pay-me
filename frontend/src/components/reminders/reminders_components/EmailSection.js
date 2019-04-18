import React, { Component } from 'react';
import Calendar from 'react-calendar';
import Checkbox from './Checkbox';
import Textarea from './Textarea';
//import Datepicker from './Datepnicker';
//import TextareaAutosize from 'react-autosize-textarea';
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import {  faEnvelope, faCheckSquare, faCoffee  } from '@fortawesome/free-solid-svg-icons'
//library.add(faEnvelope, faCheckSquare, faCoffee)




class emailsender extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date: new Date()
      };
     
    }
    onChange = date => this.setState({ date })
    
    render() {
      return (
        <div className='sectionboxcontact'>
        
         <div className='iconbox'>
         <i class="Medium material-icons icon">contact_mail</i>
         <div class="input-field ">
          <input disabled value="customerX@gmail.com" id="disabled" type="text" class="validate"/>
        </div>
         </div>
         
        <div cclassName='calendarbox'>
         <div className='calendar'><Calendar /></div>
         <div className='checkbox'><Checkbox /></div>
         </div>
         <div className='textarea'><Textarea value='Custom email message'  className='textareasize' /></div>
        </div>
      );
    }
  }
  
  export default emailsender;
  
   