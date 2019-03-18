const initState = {
    invoices: [
        {id:'1', clientName: 'Richard Lexington', company: 'Twilight Media', clientEmail: 'r.lexington@gmail.com', clientPhone: '916-123-1234', pdf:'pdf1'},
        {id:'2', clientName: 'Mary Lumen', company: 'A&M Design', clientEmail: 'm.lumen@amdesign.com', clientPhone: '209-568-1234', pdf:'pdf2'},
        {id:'3', clientName: 'Tasia Richardson', company: 'Hope Digital', clientEmail: 'trichardson@hopedigtal.com', clientPhone: '975-678-1234', pdf:'pdf3'},
        {id:'4', clientName: 'Molly Johnson', company: 'LMS Enterprises', clientEmail: 'mollyjohnson@gmail.com', clientPhone: '456-323-3334', pdf:'pdf4'},
        {id:'5', clientName: 'Tiffany Rexel', company: 'Twilight Media', clientEmail: 't.rexel@gmail.com', clientPhone: '707-623-1834', pdf:'pdf5'},
    ]
};

const invoiceReducer = (state = initState, action) => {
    return state
}

export default invoiceReducer;