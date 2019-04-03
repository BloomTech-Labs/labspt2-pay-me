import React from 'react';
import axios from 'axios';
import serverLoc from '../../serverLoc';
import './addinvoice.css';

class AddInvoice extends React.Component {
    constructor() {
        super();
        this.state = {
            clientName: '',
            clientID: 1, // This needs to be pulled from which client we're creating it for.
            companyName: '',
            email: '',
            phoneNumber: '',
            invoiceNumber: '',
            filename: '',
            formData: new FormData(),
        }
    }

    changeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    fileUpload = (event) => {
        const file = event.target.files;
        this.state.formData.append('pdf', file[0], file[0].filename)
        console.log(file);
        this.setState({
            filename: file[0].name,
            file: file
        });
    }

    submit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/invoices/', {
            invoice_number: this.state.invoiceNumber,
            client_name: this.state.clientName,
            client_id: this.state.clientID,
            company_name: this.state.companyName,
            email: this.state.email,
            phone_number: this.state.phoneNumber,
            inv_url: this.state.filename,
            file: this.state.file,
        })
        .then(res => {
            console.log(res.data);
        })
    }

    render() {
        return (
            <div>
                <form name='addInvoiceForm' onSubmit={this.submit} className='add-invoice'>
                    <label>Client Name</label>
                    <input className='addInvoiceForm-clientName' name='clientName' onChange={this.changeValue} value={this.state.clientName} />
                    <br />
                    <label>Company Name</label>
                    <input className='addInvoiceForm-companyName' name='companyName' onChange={this.changeValue} value={this.state.companyName} />
                    <br />
                    <label>Email Address</label>
                    <input className='addInvoiceForm-email' name='email' onChange={this.changeValue} value={this.state.email} />
                    <br />
                    <label>Phone Number</label>
                    <input className='addInvoiceForm-phoneNumber' name='phoneNumber' onChange={this.changeValue} value={this.state.phoneNumber} />
                    <br />
                    <label>Invoice Number</label>
                    <input className='addInvoiceForm-invoiceNumber' name='invoiceNumber' onChange={this.changeValue} value={this.state.invoiceNumber} />
                    <br />
                    <label>Upload Invoice: </label>
                    <input type='file' name='invoice' accept=".pdf" onChange={this.fileUpload} className='addInvoiceForm-uploadInvoice' />
                    <br />
                    <button name='submit'>Add Invoice</button>
                </form>
            </div>
        )
    }
}

export default AddInvoice;