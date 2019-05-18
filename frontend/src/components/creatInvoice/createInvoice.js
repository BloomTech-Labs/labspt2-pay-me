import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Sidenav from '../nav/Sidenav';
import '../../Dashboard.css';
import axios from 'axios';
import serverLoc from '../../serverLoc';

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
            <div>
                
            <div className="row">
            {created ? <h5 className="s10">Invoice successfully created.</h5> : <></>}
                <Sidenav />
            
            <div className="col s10 workspace-white"> 
                <div className="col offset-m3 create-invoice-container">
                <h3 className="center">Add New Invoice</h3>
                    <form className="create-invoice-form z-depth-0" enctype='multipart/form-data'>
                    <p className="center white-text">Complete the form below to create a new invoice</p>
                        <div className="input-field">
                        <i class="material-icons prefix">person</i>
                            <input type="text" placeholder="Client Name" onblur="this.placeholder='Client Name'" className="white grey-text" id="client_name" value={ client_name } onChange={this.ChangeValue}></input>
                        </div>
                        <div className="input-field">
                            <i class="material-icons prefix">business_center</i> 
                            <input type="text" placeholder="Company" onblur="this.placeholder='Company'" className="white grey-text"  id="company_name" value={ company_name } onChange={this.ChangeValue}></input>
                        </div>
                        <div className="input-field">
                            <i class="material-icons prefix">mail</i> 
                            {emailError ?
                            <div>Email already in use
                                <input type="email" placeholder="Email" onBlur="this.placeholder='Email'" className="white lighten-3 formError" id="email" value={email} onChange={this.ChangeValue} />
                            </div>
                            : <input type="email" placeholder="Email" onblur="this.placeholder='Email'" className="white lighten-3 grey-text"  id="email" value={ email } onChange={this.ChangeValue}></input>
                            }
                        </div>
                        <div className="input-field">
                            <i class="material-icons prefix">phone</i> 
                            {phoneError ?
                            <div>Phone number already in use
                                <input type="text" placeholder="Phone Number" onblur="this.placeholder='Phone Number'" className="white formError"  id="phone_number" value={ phone_number } onChange={this.ChangeValue} />
                            </div>
                            : <input type="text" placeholder="Phone Number" onblur="this.placeholder='Phone Number'" className="white grey-text"  id="phone_number" value={ phone_number } onChange={this.ChangeValue}></input>
                            }
                        </div>
                        <div className="input-field">
                            <label>Invoice Number</label>
                            <input type="number" placeholder="Invoice Number" onblur="this.placeholder='Invoice Number'" className="white grey-text" id="invoice_number" value={invoice_number} onChange={this.ChangeValue}></input>
                        </div>
                        <div className="input-field">
                            <label>Amount</label>
                            <input type="number" placeholder="Amount" onblur="this.placeholder='Amount'" className="white grey-text" id="amount" value={amount} onChange={this.ChangeValue}></input>
                        </div>
                        <div class="row">
                        <div class="input-field col s12">
                            <textarea id="notes" class="materialize-textarea white" data-length="120" style={{height: "6rem"}} placeholder="Notes" value={ notes } onChange={this.ChangeValue}>  </textarea>
                            <label for="textarea2">Textarea</label>
                        </div>
                        </div>
                        <div className="file-field input-field" style={{marginTop: 50}}>
                        <h6>Upload PDF invoice</h6>
                            <div className="btn blue"><i className="material-icons white-text left">picture_as_pdf</i>
                                <span>File</span>
                                <input type="file" onChange={this.singleFileChangedHandler} />
                            </div>
                                <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
                        <div className="input-field center">
                            <button className="btn-large blue add-btn" onClick={ this.singleFileUploadHandler }><i className="material-icons white-text left">add_circle</i>Create New Invoice</button>
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