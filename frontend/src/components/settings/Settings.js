import React, { Component } from 'react';
import serverLoc from '../../serverLoc';
import Sidenav from '../nav/Sidenav';
import '../../Dashboard.css';
import Axios from 'axios';
const decode = require('jwt-decode');


class Settings extends Component {
    constructor() {
        super()
        this.state= {
            email: '',
            old_password: '',
            new_password: '',
            new_password_confirmation: '',
            errors: [],
            loading: false
        };
    }
   
    ChangeValue = (e) => {
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
        } else if(!this.isPasswordValid) {
            error = { message: 'password is not valid'}
        } else {
            return true;
        }
    }

    isformEmpty = ({ email, old_password, new_password, new_password_confirmation }) => {
        return !email.length || !old_password.length || !new_password || !new_password_confirmation;
    }

    ispasswordValid = ({ email, old_password, new_password, new_password_confirmation }) => {
        if (new_password.length < 6 || new_password_confirmation.length < 6 || new_password !== new_password_confirmation) {
            return false;
        }
    }
      
    displayErrors = errors => errors.map((error, i) =>
     <p key={i}>{error.message}</p>
     )

    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const id = decode(token).userId;
        Axios.get(`${serverLoc}/auth/local/${id}`)
        .then((user) => {
            this.setState({
                email: user.data.email,
                old_password: user.data.password
            });
        })
        .catch((err) => {
            console.log(err)
        })
    };

   handleSubmit = e => {
        e.preventDefault();
        if (this.isformValid()) { 
            this.setState({
                errors: [],
                loading: true
            });
        const token = localStorage.getItem("jwt");
        const id = decode(token).userId;

        Axios.put(`http://www.localhost:5000/api/users/${id}`, {
            ...this.state,
            id: parseInt(id)
          })
          .then(res => {
            console.log(this.state);
            alert(res.data.message);
          })
          .catch(err => {
            console.log(err);
          })
          .then(this.setState({ old_password: "", new_password: "", new_password_confirmation: "", loading: false }));   
      }
   }

    render(){
        const { email, old_password, new_password, new_password_confirmation, errors, loading } = this.state;
        return (
            <div>
            <div className="row">
                <Sidenav />
            
            <div className="col s10 workspace-white"> 
                <div className="col offset-m3 create-invoice-container">
                <h3 className="center">User Settings</h3>
                                <form onSubmit={ this.handleSubmit } className="create-invoice-form z-depth-0">
                                <p className="center white-text">Complete the form below to update your settings</p>
                                    <div className="input-field">
                                    <i class="material-icons prefix">mail_outline</i>
                                        <input type="email" placeholder="email" onblur="this.placeholder='email'" className="white grey-text" id="email" onChange={this.ChangeValue} value={email}></input>
                                    </div>
                                    <div className="input-field">
                                        <i class="material-icons prefix">lock_open</i> 
                                        <input type="password" placeholder="Old password" onblur="this.placeholder='Old password'" className="white grey-text"  id="old_password" onChange={this.ChangeValue} value={old_password}></input>
                                    </div>
                                    <div className="input-field">
                                        <i class="material-icons prefix">lock_outline</i> 
                                        <input type="password" placeholder="New password" onblur="this.placeholder='New Password'" className="white lighten-3 grey-text"  id="new_password" onChange={this.ChangeValue} value={new_password}></input>
                                    </div>
                                    <div className="input-field">
                                        <i class="material-icons prefix">redo</i> 
                                        <input type="password" placeholder="Confirm password" onblur="this.placeholder='Confirm Password'" className="white lighten-3 grey-text"  id="new_password_confirmation" onChange={this.ChangeValue} value={new_password_confirmation}></input>
                                    </div>
                                    <div className="input-field center">
                                        <button className="btn white blue-text z-depth-0" disabled={ loading }>
                                        { loading && <i className="fas fa-spinner" id="loading" style={{color:"grey", marginRight: "10px"}}></i> }
                                            Save
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
                            </div>
                        </div> 
                </div>
        </div>                
                  
        )
    };
    }


export default Settings;