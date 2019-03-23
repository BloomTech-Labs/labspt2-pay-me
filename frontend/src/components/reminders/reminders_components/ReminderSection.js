import React, { Component } from 'react';
import SmsSection from './SmsSection';
import EmailSection from './EmailSection';
import Comments from './Comments.js';

 


class ReminderSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
   
  }
  onChange = date => this.setState({ date })
  
  render() {
    return (
      <form>
      <div className='row '>
        <div className='col s12 m8 l9 '>
        <div className='row wrapper-email-sms '>
        <div className='col s12 m6 l5 boxShadow'><EmailSection /></div>
        <div className='col s12 m6 l5 boxShadow'><SmsSection /></div>
        </div>
        
        </div>
        <div className='col s12 m4 l3'><Comments /></div>
      </div>
      <button class="btn reminder_submit_btn waves-effect waves-light" type="submit" name="action">Submit
    <i class="material-icons right">send</i>
  </button>
        
      </form>
    );
  }
}

export default ReminderSection;

 
