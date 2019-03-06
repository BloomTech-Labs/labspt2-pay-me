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

    render() {
        return (
            <div>
                <form name='addInvoiceForm'>
                    <input className='addInvoiceForm-clientName' name='clientName' onChange={this.changeValue} value={this.state.clientName}></input><br />
                    <input className='addInvoiceForm-companyName' name='companyName' onChange={this.changeValue} value={this.state.companyName}></input><br />
                    <input className='addInvoiceForm-email' name='email' onChange={this.changeValue} value={this.state.email}></input><br />
                    <input className='addInvoiceForm-phoneNumber' name='phoneNumber' onChange={this.changeValue} value={this.state.phoneNumber}></input><br />
                    <input className='addInvoiceForm-invoiceNumber' name='invoiceNumber' onChange={this.changeValue} value={this.state.invoiceNumber}></input>
                    <button className='addInvoiceForm-uploadInvoice' name='uploadInvoice'>Upload Invoice</button>
                </form>
            </div>
        )
    }
}

export default AddInvoice;