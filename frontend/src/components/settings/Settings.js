import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidenav from '../nav/Sidenav';
import '../../Dashboard.css';


class Settings extends Component {
    constructor() {
        super()
        this.state= {
            email: '',
            password: ''
        };
    }
   
    ChangeValue = (e) => {
        this.setState ({
            [e.target.id]: e.target.value      
        })
    };
 
   handleSubmit = e => {
    e.preventDefault();
    console.log(this.state)
   }

    render(){
        const { email, old_password, new_password } = this.state;
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
                                    <i class="material-icons prefix">email</i>
                                        <input type="email" placeholder="Udate email" onblur="this.placeholder='Update email'" className="white grey-text" id="email" onChange={this.ChangeValue}></input>
                                    </div>
                                    <div className="input-field">
                                        <i class="material-icons prefix">lock</i> 
                                        <input type="password" placeholder="Old password" onblur="this.placeholder='Old password'" className="white grey-text"  id="old_password" onChange={this.ChangeValue}></input>
                                    </div>
                                    <div className="input-field">
                                        <i class="material-icons prefix">lock</i> 
                                        <input type="password" placeholder="New password" onblur="this.placeholder='Email'" className="white lighten-3 grey-text"  id="new_password" onChange={this.ChangeValue}></input>
                                    </div>
                                    <div className="input-field center">
                                        <button className="btn-large blue add-btn" stle><i className="material-icons white-text left">add_circle</i>Save</button>
                                    </div>
                            </form>
                        </div>
        </div> 
    </div>
</div>                
                  
        )
    };
};

export default Settings;