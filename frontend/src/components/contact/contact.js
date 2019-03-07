import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../nav/Nav'
import '../../App.css';


class SignUp extends Component {
    constructor() {
        super()
        this.state= {
            name:'',
            email: '',
            message:'',
        };
    }
   
    handleChange= (e) => {
        this.setState ({
            [e.target.id]: e.target.value      
        })
    };
 
   handleSubmit = e => {
    e.preventDefault();
   }

    render(){
        const { name, email, message } = this.state;
        return (
        <div className="background">
            <Nav />
            <div className="container">
                <h1 className="center">Have a question?</h1>
                    <div className="row">
                        <div className="col offset-m3">
                    <form onSubmit={ this.handleSubmit } className="signup z-depth-0">
                        <h5 className="center">Contact us by filling out the form below.</h5>
                        <div className="input-field">
                            <i class="material-icons prefix">account_circle</i>
                            <label htmlFor="name">Name</label>
                            <input type="text" className="white grey-text" id="name" value={ name } onChange={this.handleChange}></input>
                        </div>
                        <div className="input-field">
                        <i class="material-icons prefix">email</i>
                            <label htmlFor="email">Email</label>
                            <input type="email" className="white grey-text" id="email" value={ email } onChange={this.handleChange}></input>
                        </div>
                        <div className="input-field">
                            <i class="material-icons prefix">message</i>
                            <label htmlFor="password">Message</label>
                            <textarea type="text" className="white grey-text"  id="message" value={ message } onChange={this.handleChange}></textarea>
                        </div>
                        <div className="input-field">
                            <button className="btn blue lighten-2 z-depth-0"><i class="material-icons left">send</i>Send</button>
                        </div>
                   </form>
                   </div>
                   </div>
                </div>
            </div>
        )
    };
};

export default (SignUp);