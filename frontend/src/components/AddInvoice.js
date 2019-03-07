import React from 'react';

class AddInvoice extends React.Component {
    constructor() {
        super();
        this.state = {
            clientName: '',
            companyName: '',
            email: '',
            phoneNumber: '',
            invoiceNumber: '',
            invoiceFilename: '',
        }
    }

    changeValue = (event) => {
        //console.log(`${event.target.name}:${event.target.value}`)
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    submit = (event) => {
        event.preventDefault();
        /* We'll need to send this off to the AddInvoice endpoint on the server. */
    }

    render() {
        return (
            <div>
                <form name='addInvoiceForm' onSubmit={this.submit}>
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
                    <input type='file' name='invoice' className='addInvoiceForm-uploadInvoice' />
                    <br />
                    <button name='submit'>Add Invoice</button>
                </form>
            </div>
        )
    }
}

export default AddInvoice;