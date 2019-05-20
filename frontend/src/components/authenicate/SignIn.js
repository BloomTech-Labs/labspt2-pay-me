import React, { Component } from 'react';
import serverLoc from '../../serverLoc';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../nav/NavBar'
import '../home/landingPage.css';
import googleBtn from '../../img/google_btns/btn_google_signin_light_normal_web.png'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state= {
            email: '',
            password:'',
            errors: [],
            loading: false
        };
    }

    handleChange = (e) => {
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
        } else {
            return true;
        }
    }

    // Check to see if there is a value provided to each property
    isformEmpty = ({ email, password }) => {
        return !email.length || !password.length;
    }

    // Display errors
    displayErrors = errors => errors.map((error, i) =>
     <p key={i}>{error.message}</p>
     )

    handleSubmit = e => {
        e.preventDefault();
        if (this.isformValid()) { 
        this.setState({
            errors: [],
            loading: true
        });
        axios.post(`${serverLoc}/auth/local/login/`, {
            email: this.state.email,
            password: this.state.password,
        })
        .then(res => {
            localStorage.setItem('jwt', res.data.token);
            this.forceUpdate();
            console.log(res.data.token)
            this.setState({ loading: false })
        })
        .catch(error => {
            console.log(error);
            this.setState({errors: this.state.errors.concat(error), loading: false})
        });

        //reset form data
        this.setState({
            email: '',
            password: '',
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
        <section className="background" style={{background: '#1e90ff'}}>
            <i className="fas fa-bars" id="mobile-user-nav" style={{color: "#fff", marginTop: 15, marginLeft: "5%"}} onClick={this.props.open}></i>
            <NavBar />
            <div className="container">
                <h2 className="valign center" style={{color: "#FFF"}}>Log Into Your Account</h2>
                <div className="row">
                    <div className="col offset-m3">
                        <form onSubmit={ this.handleSubmit } className="signin z-depth-0">
                            
                            {/* Email input */}  
                            <input type="email" placeholder="Email" className="white grey-text input-container" id="email" onChange={this.handleChange} value={email}></input>
                                    
                            {/* Password input */}
                            <input type="password" placeholder="Password" className="white grey-text input-container" id="password" onChange={this.handleChange} value={password}></input>

                            {/* Button */}
                            <button className="btn white blue-text z-depth-0" disabled={ loading }>
                                { loading && <i className="fas fa-spinner" id="loading" style={{color:"grey", marginRight: "10px"}}></i> }
                                Sign In
                            </button> 

                        </form>

                        {/* Display errors */} 
                        <div className="display-errors">
                            {errors.length > 0 && (
                            <message error className="center">
                                <p className="error-text">Oops...Something went wrong</p>
                                {this.displayErrors(errors)}
                            </message>
                            )}
                        </div>

                        {/* Google login */} 
                        <div className="center">
                            <p className="">Not a user? <Link to="/signup" className="jump-link">Create an account</Link></p>
                        </div>

                        <div className="center">
                            <a href={`${serverLoc}/auth/google`} >
                                <img src={googleBtn} alt='Sign in with Google'/>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        )
    };
};

export default (SignIn);