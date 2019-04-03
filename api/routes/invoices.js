const express = require('express');
const invoices = require('../../data/helpers/invoiceHelper');
const router = express.Router();

/* 
const multer = require('multer');
const {google} = require('googleapis');
const stream = require('stream');
let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

const drive = google.drive({
    version: 'v3',
    auth: 'oAuth2Client',
}) */
/* 
async function uploadFile(stream, filename, mimetype) {
    const res = await drive
} 
 */

let invoiceObj = {
    invoice_number: 1,
    company_name: 'Test company',
    inv_url: 'url/to/invoice.pdf',
    notes: 'This is my jest test invoice',
    client_id: 1
};


router.get('/', async (req, res) => {
    res.status(200).json({invoices: 'Up'});
});

router.post('/', async (req, res) => {
    const data = req.body;
    const invoice = {
        invoice_number: data.invoice_number,
        company_name: data.company_name,
        inv_url: data.inv_url,
        notes: '', // This needs to be fixed on the client side.
        client_id: data.client_id,
    };

    const invoiceID = await invoices.insert(invoice);
    console.log(invoiceID);
    res.send(`Testing ${invoiceID}`);
});

module.exports = router;