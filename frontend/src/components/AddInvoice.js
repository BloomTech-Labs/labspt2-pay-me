import React from 'react';

const AddInvoice = (props) => {
    return (
        <div>
            <></> {/*Need the menu component here*/}
            <form name='addInvoiceForm'>
                <input className='addInvoiceForm-clientName' name='clientName'></input><br />
                <input className='addInvoiceForm-companyName' name='companyName'></input><br />
                <input className='addInvoiceForm-email' name='email'></input><br />
                <input className='addInvoiceForm-phoneNumber' name='phoneNumber'></input><br />
                <input className='addInvoiceForm-invoiceNumber' name='invoiceNumber'></input>
                <button className='addInvoiceForm-uploadInvoice' name='uploadInvoice'>Upload Invoice</button>
            </form>
        </div>
    )
}

export default AddInvoice;