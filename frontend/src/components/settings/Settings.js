import React, { Component } from 'react';
import PayMeIcon from '../../img/SideNav_logo_SM.png';
import serverLoc from '../../serverLoc';
import Sidenav from '../nav/Sidenav';
import './Settings.css';
import Axios from 'axios';
const decode = require('jwt-decode');


/*
    Changed the serverLoc variable from deployed to local - Jason
*/

class Settings extends Component {
    constructor() {
        super()
        this.state= {
            email: '',
            old_password: '',
            new_password: '',
            new_password_confirmation: '',
            loading: false,
            changed: false,
            unchanged: false,
            errors: [],
            message: ''
        };
    }
   
    ChangeValue = (e) => {
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
            error = { message: 'Password needs to match and be 6 or more characters' };
            this.setState({errors: errors.concat(error)});
            return false;
        } else {
            return true;
        }
    }

    // Check to see if there is a value provided to each property
    isformEmpty = ({ email, old_password, new_password, new_password_confirmation }) => {
        return !email.length || !old_password.length || !new_password.length || !new_password_confirmation;
    }
   
    // Check to see if password greater than 6 chars and match
    ispasswordValid = ({ new_password, new_password_confirmation }) => {
        if(new_password.length < 6 || new_password_confirmation.length > 6) {
            return false;
        } else if (new_password !== new_password_confirmation) {
            return false;
        } else  {
            return true;
        }
    }
   
    // display the error to the user
    displayErrors = errors => errors.map((error, i) =>
     <p key={i}>{error.message}</p>
     )

    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const id = decode(token).subject; // I had the user_id stored inside a subject field -Jason
        Axios.get(`${serverLoc}/auth/local/${id}`)
        .then((user) => {
            this.setState({
                // The user data is sent back as an array, could select the first item in the array server or client side -Jason
                email: user.data[0].email,
                /* 
                old_password: user.data.password
                This won't work because the user's password is hashed so we don't have the plaintext version of it
                And I have the findById designed to not select the password field. No need to send hashes back to the frontend. 
                -Jason
                */
            });
        })
        .catch((err) => {
            console.log(err)
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.isformValid()) { 
            this.setState({
                errors: [],
                loading: true
            });
            const token = localStorage.getItem("jwt");
            const id = decode(token).subject; // Just the same change as above here -Jason
        
            Axios.put(`${serverLoc}/api/users/${id}`, {
                ...this.state,
                id: parseInt(id)
                })
                .then(res => {
                    console.log(this.state);
                    console.log(res);
                   // alert(res.data.message);
                    if (res.status === 200) {
                        //Display to the user that the password was successfully changed.
                        this.setState({
                            changed: true,
                        })
                    } 
                })
                .catch(err => {
                    console.log(err);
                    if (err) {
                        //Display to the user that there was an issue changing the password.
                        this.setState({
                            unchanged: true,
                        })
                    } 
                })
                .then(this.setState({ old_password: "", new_password: "", new_password_confirmation: "", loading: true }));   
            setTimeout(
                function() {
                this.setState({loading: false});
                    }
                    .bind(this),
                    2000
                );
        }
    }

    render(){
        const { email, old_password, new_password, new_password_confirmation, errors, loading, changed, unchanged } = this.state;

        return (
        <>
        <div className="outside-container">
            {/* Sidebar */} 
            <div className="nav-container">
                <Sidenav />
            </div>

             {/* Mobile Sidebar */} 
             <div className="mobile-nav-container">
                <i className="fas fa-bars" id="mobile-user-nav" onClick={this.props.open}></i> 
            </div>
 
            {/* Main content */} 
            <div className="content-container">
                <h3 className="center" style={{color: "#7795F8"}}>User Settings</h3>
                <p className="center lead-text">Fill out the form below to update or change your password</p>

            {/* Display errors */} 
            <div className="settings-display-errors center">
                {errors.length > 0 && (
                    <div error>
                        <p className="settings-error-text"><i className="fas fa-exclamation excalmation" style={{color: "#18171c", marginRight: 5}}></i>Oops...Something went wrong</p>
                        {this.displayErrors(errors)}
                    </div>
                )}

            {/* Display errors to user */} 
            {changed ? <h5 className="update-text">Password changed successfully</h5> : ""}
            {unchanged ? <h5 className="update-text">Sorry! There was an issue changing the password. Try again <i class="far fa-smile" style={{color: "#18171c", fontSize: "24px"}}></i></h5> : ""}
            </div>

                {/* Form input */} 
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <h3 className="change-password-text" style={{color: "#7795F8"}}>Change Password</h3>

                            <form onSubmit={ this.handleSubmit }>
                                {/* Email */} 
                                <input type="email" placeholder="email" className="white grey-text input-container" id="email" onChange={this.ChangeValue} value={email} ></input>

                                {/* Old password */} 
                                <input type="password" placeholder="Old password" className="white grey-text input-container"  id="old_password" onChange={this.ChangeValue} value={old_password}></input>

                                {/* New password */}     
                                <input type="password" placeholder="New password" className="white lighten-3 grey-text input-container"  id="new_password" onChange={this.ChangeValue} value={new_password}></input>
                                
                                {/* Confirm password */} 
                                <input type="password" placeholder="Confirm password" className="white lighten-3 grey-text input-container"  id="new_password_confirmation" onChange={this.ChangeValue} value={new_password_confirmation}></input>
                                {/* Button */}

                                <button className="submit-button"  disabled={ loading }>
                                { loading && <i className="fas fa-spinner" id="loading" style={{color:"#FFF", marginRight: 10}}></i> }
                                Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>     
        </>                          
        )
    };
    }


export default Settings;