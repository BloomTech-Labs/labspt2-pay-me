/*******************
 * Author: Jason Hedrick
 * Date: 3/30/2019
 * Description: A Jest test file for the invoice database helper functionality.
 */

const invoices = require('./invoiceHelper');
const clients = require('./clientsHelper');
const users = require('./usersHelper.js')
const db = require('../dbConfig');

let invoiceObj = {
    invoice_number: 1,
    company_name: 'Test company',
    inv_url: 'url/to/invoice.pdf',
    notes: 'This is my jest test invoice',
    client_id: 1
};

afterEach(async () => {
    // Clear out the databases for re-testing.
    await db('invoices').truncate();
    await db('clients').truncate();
    await db('users').truncate();

    // Re-add a user to the database to be used by the test clients.
    await users.insert({
        username: 'Test',
        password: 'test',
        email: 'test@test.com',
        plan: 'Monthly'
    });

    // Re-add a client to the database to be used by the test invoices. 
    await clients.insert({
        client_name: 'Database Test',
        company_name: 'Database Test',
        email: 'data@test.jest',
        phone_number: '4441118888',
        user_id: 1
    });

    // Reset the invoice object after each test.
    invoiceObj = {
        invoice_number: 1,
        company_name: 'Test company',
        inv_url: 'url/to/invoice.pdf',
        notes: 'This is my jest test invoice',
        client_id: 1
    };
    
});

describe('When successful the invoice table', () => {
    it('Should insert an invoice.', async () => {
        const inv_id = await invoices.insert(invoiceObj);
        expect(inv_id[0]).toBe(1);
    });

    it('Should update the invoice_number field.', async () => {
        const inv_id = await invoices.insert(invoiceObj);
        invoiceObj.invoice_number = 5;
        await invoices.update(inv_id[0], invoiceObj);
        const invoice = await invoices.findById(inv_id[0]);
        expect(invoice[0].invoice_number).toBe(5);
    });

    it('Should update the inv_url field.', async () => {
        const inv_id = await invoices.insert(invoiceObj);
        invoiceObj.inv_url = 'edited/url/toinv.pdf';
        await invoices.update(inv_id[0], invoiceObj);
        const invoice = await invoices.findById(inv_id[0]);
        expect(invoice[0].inv_url).toBe('edited/url/toinv.pdf');
    });

    it('Should update the notes field.', async () => {
        const inv_id = await invoices.insert(invoiceObj);
        invoiceObj.notes = 'Updated notes';
        await invoices.update(inv_id[0], invoiceObj);
        const invoice = await invoices.findById(inv_id[0]);
        expect(invoice[0].notes).toBe('Updated notes');
    });

    it('Should delete an invoice.', async () => {

    });

});