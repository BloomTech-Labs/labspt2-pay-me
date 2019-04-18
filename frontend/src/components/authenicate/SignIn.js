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
            email: '',
            password:'',
            errors: [],
            loading: true
        };
    }

    handleChange = (e) => {
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
        } else {
            return true;
        }
    }

    isformEmpty = ({ email, password }) => {
        return !email.length || !password.length;
    }

    displayErrors = errors => errors.map((error, i) =>
     <p key={i}>{error.message}</p>
     )

    handleSubmit = e => {
        e.preventDefault();
        if (this.isformValid()) { 
        this.setState({
            loading: true
        });
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

        //reset form data
        this.setState({
            email: '',
            password: '',
            errors: [],
            loading: false
        })
    }
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
        const { email, password, errors, loading } = this.state;
        return (
            <div className="background" style={{background: "#209cd7"}}>
            <Nav />
            <div className="container">
            <h2 className="center">Please Sign In</h2>
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
                            <button className="btn white blue-text z-depth-0" disabled={ loading }>
                            { loading && <i className="fas fa-spinner" id="loading" style={{color:"grey", marginRight: "10px"}}></i> }
                                Sign In
                            </button>   
                        </div>
                        <div>
                            {errors.length > 0 && (
                                <message error className="center">
                                    <p className="error-text">Oops...Something went wrong</p>
                                    {this.displayErrors(errors)}
                                </message>
                            )}
                        </div>
                        <div className="center">
                            <p className="">Not a user? <Link to="/signup" className="jump-link">Create an account</Link></p>
                        </div>
                        <div className="center">
                        <a href={`${serverLoc}/auth/google`} >
                            <img src={googleBtn} alt='Sign in with Google'/>
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