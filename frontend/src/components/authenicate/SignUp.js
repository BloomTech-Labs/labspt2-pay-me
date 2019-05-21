import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import serverLoc from '../../serverLoc';
import NavBar from '../nav/NavBar'
import '../home/landingPage.css';


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

    // Form validation
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
    // Check to see if there is a value provided to each property
    isformEmpty = ({ username, email, password, passwordConfirmation }) => {
        return !username || !email.length || !password.length || !passwordConfirmation
    }
    // Check to see if password greater than 6 chars and match
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
            this.setState({ loading: true })
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
        <section className="background" style={{background: '#1e90ff'}}>
            <i className="fas fa-bars" id="mobile-user-nav" style={{color: "#fff", marginTop: 15, marginLeft: "5%"}} onClick={this.props.open}></i>
            <NavBar />
            <div className="container">
                <h1 className="center" style={{color: "#FFF"}}>Try Pay Me Today!</h1>
                <div className="row">
                    <div className="col offset-m3">
                        <form onSubmit={ this.handleSubmit } className="signin z-depth-0">
                            <h5 className="center" >Sign up to create an account</h5>
                            <p className=" center">Create an account and start generating invoices!</p>
                                    
                            {/* Username input */} 
                            <input type="text" placeholder= "Username" className="white grey-text input-container" id="username" value={ username } onChange={this.handleChange}></input>
                             
                            {/* Email input */}  
                            <input type="email" placeholder="Email" className="white grey-text input-container" id="email" onChange={this.handleChange} value={email}></input>
                                   
                            {/* Password input */}
                            <input type="password" placeholder="Password" className="white grey-text input-container" id="password" onChange={this.handleChange} value={password}></input>

                            {/* Password input */}
                            <input type="password" placeholder="Password Confirmation" className="white grey-text input-container" id="passwordConfirmation" onChange={this.handleChange} value={passwordConfirmation}></input>

                            {/* Button */}
                            <button className="btn white blue-text z-depth-0" disabled={ loading } >
                                { loading && <i className="fas fa-spinner" id="loading" style={{color:"grey", marginRight: "10px"}}></i> }
                                Sign Up
                            </button>   
                             
                        </form>

                        {/* Display errors */} 
                        <div>
                            {errors.length > 0 && (
                                <message error className="center">
                                    <p className="error-text" style={{color: "#FFF"}}><i class="material-icons prefix" style={{marginRight: "5px"}}>info</i>Oops...Something went wrong</p>
                                    {this.displayErrors(errors)}
                                </message>
                            )}
                        </div>

                        <div className="center already-user-link">
                            <p className="">Already a user? <Link to="/signup" className="jump-link">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    };
};

export default (SignUp);