
import React, { Component } from 'react';
import Calendar from 'react-calendar';
 


class Datepickers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
   
  }
  onChange = date => this.setState({ date })
  
  render() {
    return (
      <div>
        <Calendar className='calendar boxShadow'
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default Datepickers;

 
