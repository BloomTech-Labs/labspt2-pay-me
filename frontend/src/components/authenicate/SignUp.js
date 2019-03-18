import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
   }

    render(){
        const { username, email, password, passwordConfirmation, errors, loading } = this.state;
        return (
        <div className="background">
            <Nav />
            <div className="container">
                    <div className="row">
                        <div className="col offset-m3">
                            <h1 className="center">Try Pay Me Today!</h1>
                                <form onSubmit={ this.handleSubmit } className="signup z-depth-0">
                                    <h5 className="center">Sign up to create an account</h5>
                                    <p className=" center">Create an account and start generating invoices!</p>
                                    
                                    <div className="input-field">
                                        <i class="material-icons prefix">account_circle</i>
                                        <input type="text" placeholder="Username" onblur="this.placeholder='Username'" className="white grey-text" id="username" value={ username } onChange={this.handleChange}></input>
                                    </div>

                                    <div className="input-field">
                                    <i class="material-icons prefix">email</i>
                                        <input type="email" placeholder="Email" onblur="this.placeholder='Email'" className="white grey-text" id="email" value={ email } onChange={this.handleChange}></input>
                                    </div>
                                    
                                    <div className="input-field">
                                        <i class="material-icons prefix">lock</i>
                                        <input type="password" placeholder="Password" onblur="this.placeholder='Password'" className="white grey-text"  id="password" value={ password } onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-field">
                                        <i class="material-icons prefix">lock</i>
                                        <input type="password" placeholder="Comfirm Password" onblur="this.placeholder='Confirm Password'" className="white grey-text" id="passwordConfirmation" value={ passwordConfirmation } onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-field">
                                        <button className="btn white blue-text z-depth-0" disabled ={ loading }>Sign Up</button>
                                    </div>
                                    <div className="center">
                                        <p className="">Already a user? <Link to="/signin" className="jump-link">Login</Link></p>
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