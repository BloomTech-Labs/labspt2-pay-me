import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidenav from '../nav/Sidenav';
import '../../Dashboard.css';


class CreateInvoice extends Component {
    constructor() {
        super()
        this.state= {
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
    console.log(this.state)
   }

    render(){
        const { clientName, clientEmail, phoneNumber, company } = this.state;
        return (

            <div>
            <div className="row">
                <Sidenav />
            
            <div className="col s10 workspace-white"> 
                <div className="col offset-m3 create-invoice-container">
                <h3 className="center"><i class="material-icons prefix header-icon">receipt</i>Create New Invoice</h3>
                                <form onSubmit={ this.handleSubmit } className="create-invoice-form z-depth-0">
                                <p className="center white-text">Complet the form below to create a new invoice</p>
                                    <div className="input-field">
                                    <i class="material-icons prefix">person</i>
                                        <input type="text" placeholder="Client Name" onblur="this.placeholder='Client Name'" className="white grey-text" id="clientName" value={ clientName } onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-field">
                                        <i class="material-icons prefix">business_center</i> 
                                        <input type="text" placeholder="Company" onblur="this.placeholder='Company'" className="white grey-text"  id="company" value={ company } onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-field">
                                        <i class="material-icons prefix">mail</i> 
                                        <input type="email" placeholder="Email" onblur="this.placeholder='Email'" className="white lighten-3 grey-text"  id="clientEmail" value={ clientEmail } onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-field">
                                        <i class="material-icons prefix">phone</i> 
                                        <input type="text" placeholder="Phone Number" onblur="this.placeholder='Phone Number'" className="white grey-text"  id="phoneNumber" value={ phoneNumber } onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-field center">
                                        <button className="btn-large blue add-btn"><i className="material-icons white-text left">add_circle</i>Create New Invoice</button>
                                    </div>
                            </form>
                        </div>
        </div> 
    </div>
</div>                
                  
        )
    };
};

export default CreateInvoice;