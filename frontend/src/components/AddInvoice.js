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
                    <input className='addInvoiceForm-clientName' name='clientName' onChange={this.changeValue} value={this.state.clientName}></input><br />
                    <input className='addInvoiceForm-companyName' name='companyName' onChange={this.changeValue} value={this.state.companyName}></input><br />
                    <input className='addInvoiceForm-email' name='email' onChange={this.changeValue} value={this.state.email}></input><br />
                    <input className='addInvoiceForm-phoneNumber' name='phoneNumber' onChange={this.changeValue} value={this.state.phoneNumber}></input><br />
                    <input className='addInvoiceForm-invoiceNumber' name='invoiceNumber' onChange={this.changeValue} value={this.state.invoiceNumber}></input>
                    <input type='file' name='invoice' className='addInvoiceForm-uploadInvoice'>Upload Invoice</input>
                </form>
            </div>
        )
    }
}

export default AddInvoice;