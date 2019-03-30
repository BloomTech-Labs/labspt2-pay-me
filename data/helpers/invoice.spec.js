const invoice = require('./clientsHelper');
const db = require('../dbConfig');

const invoiceObj = {
    invoice_number: 1,
    inv_url: 'url/to/invoice.pdf',
    notes: 'This is my jest test invoice',
    client_id: 0
};
