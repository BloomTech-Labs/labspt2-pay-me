import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidenav from '../nav/Sidenav';
import '../../Dashboard.css';


class Billing extends Component {
    constructor() {
        super()
        this.state= {
            invoiceNumber:'',
            clientName:'',
            clientEmail: '',
            phoneNumber:'',
            company:''
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
        const { cc, exp, cvv} = this.state;
        return (

            <div>
            <div className="row">
                <Sidenav />
            
            <div className="col s10 workspace-white">
                
                <div className="col offset-m3 billing-container">
                            <h3 className="center">Billing Information</h3>
                                <form onSubmit={ this.handleSubmit } className="billing-form z-depth-0">
                                <h6>Payment Info:</h6>
                                    <div className="input-field">
                                        <i class="material-icons prefix">payment</i>
                                        <input type="text" placeholder="CC#" onblur="this.placeholder='Invoice Number'" className="white grey-text" id="invoiceNumber" value={ cc } onChange={this.handleChange}></input>
                                    </div>
                                
                                        <div className="input-field">
                                        <i class="material-icons prefix">calendar_today</i>
                                            <input type="text" placeholder="EXP" onblur="this.placeholder='Client Name'" className="white grey-text" id="clientName" value={ exp } onChange={this.handleChange}></input>
                                        </div>
                                        <div className="input-field">
                                            <i class="material-icons prefix">lock</i> 
                                            <input type="text" placeholder="CVV" onblur="this.placeholder='Company'" className="white grey-text" id="company" value={ cvv } onChange={this.handleChange}></input>
                                        </div>
                                  
                                    <div>
                                        <label>
                                            <input type="checkbox" className="subscribe"/>
                                            <span>1 Month Subscription - $20</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="checkbox" className="subscribe"/>
                                            <span>1 Client - $1.99</span>
                                        </label>
                                    </div>
                                    <div className="input-field center">
                                        <button className="btn-large blue add-btn">Buy Now
                                        </button>
                                    </div>
                            </form>  
                        </div>
                </div> 
            </div>
        </div>                
                  
        )
    };
};

export default Billing;