import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import serverLoc from '../../serverLoc';
import Nav from '../nav/Nav'
import '../../App.css';


class SignUp extends Component {
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
        axios.post(`${serverLoc}/auth/local/signup/`, {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            plan: 'none' 
        })
        .then(res => {
            localStorage.setItem('jwt', res.data.token);
            this.forceUpdate();
        })
        .catch(error => {
            console.log(error.response);
        });
    }

    render(){
        const token = localStorage.getItem('jwt');
        if (token && token !== 'undefined') {
            return (
                <Redirect to='/dashboard' />
            )
        }
        const { username, email, password, passwordConfirmation, errors, loading } = this.state;
        return (
        <div className="background" style={{background: "#209cd7"}}>
            <Nav />
            <div className="container">
                <h1 className="center">Try Pay Me Today!</h1>
                    <div className="row">
                        <div className="col offset-m4">
                    <form onSubmit={ this.handleSubmit } className="signup z-depth-0">
                        <h5 className="center">Sign up to create an account</h5>
                        <p className=" center">Create an account and start generating invoices!</p>
                        
                        <div className="input-field">
                            <i class="material-icons prefix">account_circle</i>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="white grey-text" id="username" value={ username } onChange={this.handleChange}></input>
                        </div>

                        <div className="input-field">
                        <i class="material-icons prefix">email</i>
                            <label htmlFor="email">Email</label>
                            <input type="email" className="white grey-text" id="email" value={ email } onChange={this.handleChange}></input>
                        </div>
                        <div className="input-field">
                            <i class="material-icons prefix">lock</i>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="white grey-text"  id="password" value={ password } onChange={this.handleChange}></input>
                        </div>
                        <div className="input-field">
                            <i class="material-icons prefix">lock</i>
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" className="white grey-text" id="passwordConfirmation" value={ passwordConfirmation } onChange={this.handleChange}></input>
                        </div>
                        <div className="input-field">
                            <button className="btn white blue-text z-depth-0" disabled ={ loading }>Sign Up</button>
                        </div>
                        <div className="center">
                            <p className="">Already a user? <Link to="/signup" className="jump-link">Login</Link></p>
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