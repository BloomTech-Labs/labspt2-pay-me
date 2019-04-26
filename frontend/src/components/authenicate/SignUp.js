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
            errors: [],
            loading: false
        };
    }
   
    handleChange= (e) => {
        this.setState ({
            [e.target.id]: e.target.value      
        })
    };
    isformValid = () => {
        let errors = [];
        let error;

        if(this.isformEmpty(this.state)) {
            error = { message: 'Please fill in all fields' };
            this.setState({errors: errors.concat(error)});
            return false;
        } else if(!this.ispasswordValid(this.state)) {
            error = { message: 'Password is not valid' };
            this.setState({errors: errors.concat(error)});
            return false;
        } else {
            return true;
        }
    }

    isformEmpty = ({ username, email, password, passwordConfirmation }) => {
        return !username || !email.length || !password.length || !passwordConfirmation
    }

    ispasswordValid = ({ password, passwordConfirmation }) => {
        if(password.length < 6 || passwordConfirmation.length > 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else  {
            return true;
        }
    }

    displayErrors = errors => errors.map((error, i) =>
     <p key={i}>{error.message}</p>
     )

    handleSubmit = e => {
        e.preventDefault();/*
        if (this.isformValid()) { 
        this.setState({
            errors: [],
            loading: true
        });*/
        axios.post(`${serverLoc}/auth/local/signup/`, {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            plan: 'none' 
        })
        .then(res => {
            localStorage.setItem('jwt', res.data.token);
            this.forceUpdate();
            console.log(res.data.token)
            this.setState({ loading: false })
        })
        .catch(error => {
            console.log(error.response);
            this.setState({errors: this.state.errors.concat(error), loading: false})
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
            <div className="signup-container">
                <h1 className="center">Try Pay Me Today!</h1>
                    <div className="row">
                        <div className="col offset-m4">
                    <form onSubmit={ this.handleSubmit } className="signup z-depth-0">
                        <h5 className="center">Sign up to create an account</h5>
                        <p className=" center">Create an account and start generating invoices!</p>
                        
                        <div className="input-field">
                            <i class="material-icons prefix">account_circle</i>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="white grey-text input-container" id="username" value={ username } onChange={this.handleChange}></input>
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
                            <i class="material-icons prefix">redo</i>
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" className="white grey-text" id="passwordConfirmation" value={ passwordConfirmation } onChange={this.handleChange}></input>
                        </div>
                        <div className="input-field">
                            <button className="btn white blue-text z-depth-0" disabled={ loading } >
                            { loading && <i className="fas fa-spinner" id="loading" style={{color:"grey", marginRight: "10px"}}></i> }
                                Sign Up
                            </button>   
                        </div>
                        <div>
                            {errors.length > 0 && (
                                <message error className="center">
                                    <p className="error-text"><i class="material-icons prefix" style={{marginRight: "5px"}}>info</i>Oops...Something went wrong</p>
                                    {this.displayErrors(errors)}
                                </message>
                            )}
                        </div>
                   </form>
                   <div className="center">
                        <p className="">Already a user? <Link to="/signup" className="jump-link">Login</Link></p>
                    </div>
                   </div>
                   </div>
                </div>
            </div>
        )
    };
};

export default (SignUp);