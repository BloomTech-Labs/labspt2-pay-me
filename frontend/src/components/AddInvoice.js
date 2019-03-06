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
                    <input className='addInvoiceForm-clientName' name='clientName' onChange={this.changeValue} value={this.state.clientName} />
                    <br />
                    <input className='addInvoiceForm-companyName' name='companyName' onChange={this.changeValue} value={this.state.companyName} />
                    <br />
                    <input className='addInvoiceForm-email' name='email' onChange={this.changeValue} value={this.state.email} />
                    <br />
                    <input className='addInvoiceForm-phoneNumber' name='phoneNumber' onChange={this.changeValue} value={this.state.phoneNumber} />
                    <br />
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