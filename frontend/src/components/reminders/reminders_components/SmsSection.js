import React, { Component } from 'react';
import Calendar from 'react-calendar';
import Checkbox from './Checkbox';
import Textarea from './Textarea';
//import Datepicker from './Datepicker';
//import TextareaAutosize from 'react-autosize-textarea';
import ReactDOM from 'react-dom'

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { faSms, faCheckSquare, faCoffee  } from '@fortawesome/free-solid-svg-icons'
//library.add(faSms, faCheckSquare, faCoffee)


class smssender extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date: new Date()
      };
     
    }
    onChange = date => this.setState({ date })
    
    render() {
      return (
        <div className='sectionboxcontact boxShadow'>
        
         <div className='iconbox'>
         <i class="Medium material-icons icon">contact_phone</i>
         <div class="input-field ">
          <input disabled value="+19788747878" id="disabled" type="text" class="validate"/>
        </div>
         </div>
         
        <div cclassName='calendarbox'>
         <div className='calendar'><Calendar /></div>
         <div className='checkbox'><Checkbox /></div>
         </div>
         <div className='textarea'><Textarea value='Custom sms message'  className='textareasize' /></div>
        </div>
      );
    }
  }
  
  export default smssender;
  
   