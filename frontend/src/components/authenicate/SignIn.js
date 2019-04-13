import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import serverLoc from '../../serverLoc';
import Nav from '../nav/Nav'
import '../../App.css';

import googleBtn from '../../img/google_btns/btn_google_signin_dark_normal_web.png'

class SignIn extends Component {
    constructor(props) {
        super(props)
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
        axios.post(`${serverLoc}/auth/local/login/`, {
            email: this.state.email,
            password: this.state.password,
        })
        .then(res => {
            localStorage.setItem('jwt', res.data.token);
            this.forceUpdate();
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        if (this.props.match.params.jwt) {
            localStorage.setItem('jwt', this.props.match.params.jwt);
            this.forceUpdate();
        }
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
                <h4 className="center form-heading">Please Sign In</h4>
                    <div className="row">
                        <div className="col offset-m3">
                    <form onSubmit={ this.handleSubmit } className="signin z-depth-0">
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
                            <button className="btn white blue-text z-depth-0" disabled ={ loading }>Sign In</button>
                        </div>
                        <div className="center">
                            <p className="">Not a user? <Link to="/signup" className="jump-link">Create an account</Link></p>
                        </div>
                        <a href={`${serverLoc}/auth/google`}>
                            <img src={googleBtn} alt='Sign in with Google'/>
                        </a>
                   </form>
                   </div>
                   </div>
                </div>
            </div>
        )
    };
};

export default (SignIn);