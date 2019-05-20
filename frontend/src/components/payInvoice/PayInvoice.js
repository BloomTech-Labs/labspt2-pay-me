import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Sidenav from '../nav/Sidenav';
import '../../Dashboard.css';


class PayInvoice extends Component {
    constructor() {
        super()
        this.state= {
            cc:'',
            cvv:'',
            exp: '',
            errors: [],
            loading: false
        };
    }
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

    isformEmpty = ({ cc, cvv, exp }) => {
        return !cc.length || !cvv.length || !exp.length;
    }

    displayErrors = errors => errors.map((error, i) =>
     <p key={i}>{error.message}</p>
     )

    handleChange= (e) => {
        this.setState ({
            [e.target.id]: e.target.value      
        })
    };
 
   handleSubmit = e => {
    e.preventDefault();
   }

    render(){
        const token = localStorage.getItem('jwt');
        if (!token || token === 'undefined') {
            return (
                <Redirect to='/signin' />
            )
        }
        const { cc, exp, cvv, loading, errors, payment} = this.state;
        return (
            <div>
                <Sidenav />
            <div className="col s10 workspace"> 
                <div className="settings-container">
                <h1 style={{ color: "#1e90ff", marginLeft: "45%"}}><i class="material-icons" style={{color: "#1e90ff", fontSize: "42px", marginRight: 5}}>payment</i>Pay Invoice</h1>
                <input type="text" placeholder="Payment" onblur="this.placeholder='Payment'" className="white grey-text" id="payment" onChange={this.ChangeValue} value={payment} className="input-container"></input>
                <h3 style={{ color: "#1e90ff", marginLeft: "53%", fontSize: "32px"}}><i class="material-icons" style={{color: "#1e90ff", fontSize: "32px", marginRight: 5}}>attachment</i>Invoice</h3>
    
                    <form onSubmit={ this.handleSubmit } className="create-invoice-form z-depth-0">
                            <p style={{ color: "#1e90ff", marginLeft: "20%" }}>Complete the form below to input your billing information</p>
                                <div className="input-field">
                                    <i class="material-icons prefix" style={{ color: "#1e90ff"}}>payment</i>
                                    <input type="text" placeholder="CC#" onblur="this.placeholder='CC#'" className="white grey-text" id="cc" onChange={this.ChangeValue} value={cc} className="input-container"></input>
                                </div>
                                <div className="input-field">
                                    <i class="material-icons prefix" style={{ color: "#1e90ff"}}>calendar_today</i>
                                    <input type="text" placeholder="CVV" onblur="this.placeholder='CVV'" className="white grey-text" id="cvv" onChange={this.ChangeValue} value={cvv} className="input-container"></input>
                                </div>
                                <div className="input-field">
                                    <i class="material-icons prefix" style={{ color: "#1e90ff"}}>lock</i>
                                    <input type="text" placeholder="EXP" onblur="this.placeholder='EXP'" className="white grey-text" id="exp" onChange={this.ChangeValue} value={exp} className="input-container"></input>
                                </div>
                                <div className="input-field" style={{marginLeft: "35%", marginTop: 40}}>
                                    <button className="btn blue white-text z-depth-0" disabled={ loading } style={{width: "150px", height: "50px", fontSize: "14px"}}>
                                    { loading && <i className="fas fa-spinner" id="loading" style={{color:"grey", marginRight: "10px"}}></i> }
                                        Purchase
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
                  
        )
    };
};

export default PayInvoice;