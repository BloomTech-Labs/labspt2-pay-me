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
                    <div className="row">
                        <div className="col offset-m3">
                            <h1 className="center">Have a question?</h1>
                                <form onSubmit={ this.handleSubmit } className="contact-form z-depth-0">
                                    <h5 className="center">Contact us by filling out the form below.</h5>
                                    <div className="input-field">
                                        <i class="material-icons prefix">account_circle</i>
                                        <input type="text" placeholder="Name" onblur="this.placeholder='Name'" className="white grey-text" id="name" value={ name } onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-field">
                                    <i class="material-icons prefix">email</i>
                                        <input type="email" placeholder="email" onblur="this.placeholder='email'" className="white grey-text" id="email" value={ email } onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-field">
                                        <i class="material-icons prefix">message</i> 
                                        <textarea type="text" placeholder="Message" onblur="this.placeholder='Message'" className="white grey-text message-form"  id="message" value={ message } onChange={this.handleChange}></textarea>
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