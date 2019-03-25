import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Nav from '../nav/Nav'
import '../../App.css';
import googleButton from '../../img/google_btns/btn_google_signin_dark_normal_web.png'
import Axios from 'axios';
import serverLoc from '../../serverLoc';


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
        Axios.post(`${serverLoc}/auth/local/login`, 
        {username: this.state.username,
        password: this.state.password})
        .then(res => {
            console.log(res.data);
            localStorage.setItem('jwt', res.data.token);
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        if (this.props.match.params.jwt) {
            localStorage.setItem('jwt', this.props.match.params.jwt);
        }
    }
    
    render(){
        console.log(serverLoc);
        // We may want to change this to check if the jwt is on localstorage instead of checking the params for it.
        if (this.props.match.params.jwt) {
            // Redirect to after login landing page. For now it redirects to the root.
            // -Jason Hedrick
            return <Redirect to='/' />;
        }
        const { username, email, password, passwordConfirmation, errors, loading } = this.state;
        return (
        <div className="background">
            <Nav />
            <div className="container">
                <h4 className="center form-heading">Please Sign In</h4>
                    <div className="row">
                        <div className="col offset-m3">
                    <form onSubmit={ this.handleSubmit } className="signin z-depth-0">
                        <div className="input-field">
                        <i class="material-icons prefix"></i>
                            <label htmlFor="username">Username</label>
                            <input className="white grey-text" id="username" value={ username } onChange={this.handleChange}></input>
                        </div>
                        <div className="input-field">
                            <i class="material-icons prefix">lock</i>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="white grey-text"  id="password" value={ password } onChange={this.handleChange}></input>
                        </div>
                        <div className="input-field">
                            <button className="btn-medium white blue-text z-depth-0">Sign In</button>
                        </div>
                        <div className="center">
                            <p className="">Not a user? <Link to="/signup" className="jump-link">Create an account</Link></p>
                        </div>
                        <div className="center google">
                            <a href={`${serverLoc}/auth/google/`}>
                                <img alt="Sign in with Google" src={googleButton} />
                            </a>
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