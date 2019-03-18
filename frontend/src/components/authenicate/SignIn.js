import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../nav/Nav'
import '../../App.css';


class SignIn extends Component {
    constructor() {
        super()
        this.state= {
            username:'',
            email: '',
            password:'',
            passwordConfirmation: '',
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
        const { username, email, password, passwordConfirmation, errors, loading } = this.state;
        return (
        <div className="background">
            <Nav />
            <div className="container">
                    <div className="row">
                        <div className="col offset-m3">
                            <h3 className="center form-heading">Sign In to your account</h3>
                            <form onSubmit={ this.handleSubmit } className="input-form z-depth-0">
                                <div className="input-field">
                                <i class="material-icons prefix label-icon">email</i>
                                    <input type="email" placeholder="Email" onblur="this.placeholder='Email'" className="white grey-text" id="email" value={ email } onChange={this.handleChange}></input>
                                </div>
                                <div className="input-field">
                                    <i class="material-icons prefix label-icon">lock</i>
                                    <input type="password" placeholder="Password" onblur="this.placeholder='Password'" className="white grey-text"  id="password" value={ password } onChange={this.handleChange}></input>
                                </div>
                                <div className="input-field">
                                    <button className="btn white blue-text z-depth-0">Sign In</button>
                                </div>
                                <div className="center">
                                    <p className="">Not a user? <Link to="/signup" className="jump-link">Create an account</Link></p>
                                </div>
                            </form>
                        </div>
                   </div>
                </div>
            </div>
        )
    };
};

export default (SignIn);