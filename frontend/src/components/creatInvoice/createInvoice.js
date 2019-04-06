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
            companyName:'',
            invoiceNumber: '',
            invoiceFilename: '',
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
        const { clientName, clientEmail, phoneNumber, companyName } = this.state;
        return (

            <div>
            <div className="row">
                <Sidenav />
            
            <div className="col s10 workspace-white"> 
                <div className="col offset-m3 create-invoice-container">
                <h3 className="center">Add New Invoice</h3>
                                <form onSubmit={ this.handleSubmit } className="create-invoice-form z-depth-0">
                                <p className="center white-text">Complete the form below to create a new invoice</p>
                                    <div className="input-field">
                                    <i class="material-icons prefix">person</i>
                                        <input type="text" placeholder="Client Name" onblur="this.placeholder='Client Name'" className="white grey-text" id="clientName" value={ clientName } onChange={this.ChangeValue}></input>
                                    </div>
                                    <div className="input-field">
                                        <i class="material-icons prefix">business_center</i> 
                                        <input type="text" placeholder="Company" onblur="this.placeholder='Company'" className="white grey-text"  id="company" value={ companyName } onChange={this.ChangeValue}></input>
                                    </div>
                                    <div className="input-field">
                                        <i class="material-icons prefix">mail</i> 
                                        <input type="email" placeholder="Email" onblur="this.placeholder='Email'" className="white lighten-3 grey-text"  id="clientEmail" value={ clientEmail } onChange={this.ChangeValue}></input>
                                    </div>
                                    <div className="input-field">
                                        <i class="material-icons prefix">phone</i> 
                                        <input type="text" placeholder="Phone Number" onblur="this.placeholder='Phone Number'" className="white grey-text"  id="phoneNumber" value={ phoneNumber } onChange={this.ChangeValue}></input>
                                    </div>
                                    <div class="row">
                                    <div class="input-field col s12">
                                        <textarea id="textarea2" class="materialize-textarea white" data-length="120" style={{height: "6rem"}} placeholder="Notes" onblur="this.placeholder='Notes'">  </textarea>
                                        <label for="textarea2">Textarea</label>
                                    </div>
                                    </div>
                                    <div className="file-field input-field" style={{marginTop: 50}}>
                                    <h6>Upload PDF invoice</h6>
                                        <div className="btn blue"><i className="material-icons white-text left">picture_as_pdf</i>
                                            <span>File</span>
                                            <input type="file" />
                                        </div>
                                            <div class="file-path-wrapper">
                                            <input class="file-path validate" type="text" />
                                         </div>
                                    </div>
                                    <div className="input-field center">
                                        <button className="btn-large blue add-btn" stle><i className="material-icons white-text left">add_circle</i>Create New Invoice</button>
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