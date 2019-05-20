import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidenav from '../nav/Sidenav';
import './CreateInvoice.css';
import axios from 'axios';
import serverLoc from '../../serverLoc';
import PayMeIcon from '../../img/SideNav_logo_SM.png';
import MaskedInput from 'react-text-mask'

class CreateInvoice extends Component {
    constructor() {
        super()
        this.state= {
            client_name: '',
            email: '',
            phone_number: '',
            company_name: '',
            notes: '',
            invoice_number: '',
            amount: '',
            selectedFile: null,
            created: false,
            emailError: false,
            phoneError: false,
        };
    }
   
    ChangeValue = (e) => {
        this.setState ({
            [e.target.id]: e.target.value      
        })
    };
    
    singleFileChangedHandler = ( event ) => {
    this.setState({
     selectedFile: event.target.files[0]
    });
   };

   singleFileUploadHandler = ( e ) => {
    e.preventDefault();
    const endpoint =`${serverLoc}/api/invoices/create`;
    const data = new FormData();
    data.append('invoice', JSON.stringify({
        invoice_number: this.state.invoice_number,
        client_name: this.state.client_name,
        company_name: this.state.company_name,
        email: this.state.email,
        phone_number: this.state.phone_number, 
        amount: this.state.amount,
        notes: this.state.notes,
    }));
    data.append( 'pdf', this.state.selectedFile, this.state.selectedFile.name );
    const token = localStorage.getItem('jwt');
    axios.post( endpoint, data, {
        headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        'Authorization': token,
        }
    })
    .then( ( response ) => {
        if (response.status === 201) {
            //Display to the user that the invoice was successfully created.
            this.setState({
                created: true,
                client_name: '',
                email: '',
                phone_number: '',
                company_name: '',
                notes: '',
                invoice_number: '',
                amount: '',
            })
        }
    if ( 200 === response.status ) {
        // If file size is larger than expected.
        if( response.data.error ) {
            if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
            console.log( 'Max size: 4MB');
            } else {
            console.log( response.data );
  // If not the given file type
          console.log( response.data.error);
         }
        } else {
         // Success
         let fileName = response.data;
         console.log( 'fileName', fileName );
         console.log( 'File Uploaded Successfuly');
        }
       }
      }).catch( ( error ) => {
        // If another error
        if (error.response.data.email === true || error.response.data.phone === true) {
          console.log('inside setstate block')
          this.setState({
              emailError: error.response.data.email,
              phoneError: error.response.data.phone
          })
        }
      console.log( error );
     });
  };

    render(){
        const token = localStorage.getItem('jwt');
        if (!token || token === 'undefined') {
            return (
                <Redirect to='/signin' />
            )
        }

        const { client_name, email, phone_number, company_name, notes, invoice_number, created, amount, emailError, phoneError } = this.state;
        
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
                <h3 className="center" style={{color: "#7795F8"}}>New Invoice</h3>
                <p className="center lead-text">Complete the form to create a new invoice</p>
                {created ? <h5 className="s10 center created-text">Invoice has been successfully created.</h5> : ""}
                <div className="container">
                    <div className="row">
                    
                        <form className="creat-invoice-form" enctype="multipart/form-data">
                            <div className="col s12 m6">
                                {/* Invoice Number input */}
                                <input type="number" placeholder="Invoice Number" id="invoice_number" value={invoice_number} onChange={this.ChangeValue}></input>

                                {/* Amount input */}
                                <input type="number" placeholder="Amount" id="amount" value={amount} onChange={this.ChangeValue}></input>

                                {/* Company Name input */}
                                <input type="text" placeholder="Company" id="company_name" value={ company_name } onChange={this.ChangeValue}></input> 
                            </div>

                            <div className="col s12 m6">
                                {/* Client Name input */}
                                <input type="text" placeholder="Client Name" id="client_name" value={ client_name } onChange={this.ChangeValue}></input>

                                {/* Phone Number input */}
                                {phoneError ?
                                <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} 
                                    placeholder="Phone number already in use!" 
                                    id="phone_number" 
                                    value={ phone_number } 
                                    onChange={this.ChangeValue} 
                                    className="error-input" />
                                : <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}  
                                    placeholder="Phone Number" 
                                    id="phone_number" 
                                    value={ phone_number } 
                                    onChange={this.ChangeValue} /> } 

                                {/* Email input */}
                                {emailError ?    
                                <input 
                                    type="email" 
                                    placeholder="Email address already in use!" 
                                    id="email" 
                                    value={ email } 
                                    onChange={this.ChangeValue} 
                                    className="error-input">
                                </input> 
                               : <input 
                                    type="email" 
                                    placeholder="Email" 
                                    id="email" 
                                    value={ email } 
                                    onChange={this.ChangeValue}>
                                </input> }
                            </div>
                            
                            {/* Notes input */}
                            <div className="notes-container">
                                <textarea type="text" placeholder="Notes" className="matierialize-textarea white grey-text"  id="notes" value={ notes } onChange={this.ChangeValue}></textarea>
                            </div>

                            {/* File Upload input */}
                            <div className="col s12 offset-s2 file-upload-container">
                                <div className="file-field input-field file-container" style={{marginTop: 10}}>
                                
                                    <div className="btn btnFlat" style={{background: '#1e90ff'}}>
                                        <span className="file-upload-text">Upload</span>
                                        <input type="file" onChange={this.singleFileChangedHandler} />
                                    </div>

                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" placeholder="Upload a PDF document" type="text" />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="center createInvoice-button-container">
                                <button className="createInvoice-button" onClick={ this.singleFileUploadHandler } style={{background: '#1e90ff'}}>Create Invoice</button>
                            </div>
                            
                        </form>    
                    </div>
                </div>
            </div>
        </div>
        </>           
        )
    };
};

export default CreateInvoice;