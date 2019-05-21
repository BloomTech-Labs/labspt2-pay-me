const db = require('../dbConfig');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
    findByClientId,
    test
};

async function test() {
    
}

async function getAll(userID) {
    let invoice = await db('invoices').where('user_id', userID);
    const clients = await db('clients');
    clients.forEach(client =>  {
        invoice.forEach(invoice => {
            if (client.id === invoice.client_id) {
                invoice.client_name = client.client_name;
                invoice.company_name = client.company_name;
                invoice.phone_number = client.phone_number;
                invoice.email = client.email;
            }
        })
    })
    return await invoice;
    
    /*
    return await db('invoices').where('user_id', userID)
    .leftJoin(db('clients').select('client_name', 'company_name', 'email', 'phone_number').where('id', 'invoices.id'));
    */
    //.orderBy('invoices.invoice_number', 'desc');  
};

async function getByClientID(clientID) {
    return await db('invoices').where('client_id', clientID);
}

async function insert(invoice) {
    return await db('invoices').insert(invoice);
};

async function update(id, changes) {
    return db('invoices')
    .where({ id })
    .update(changes);
};

async function findById(id) {
    const clients = await db('clients');
    let invoice = await db('invoices').where('id', id);
    clients.forEach(client => {
        invoice.forEach(invoice => {
            if (client.id === invoice.client_id) {
                invoice.client_name = client.client_name;
                invoice.company_name = client.company_name;
                invoice.phone_number = client.phone_number;
                invoice.email = client.email;
            }
        })
    })
    return await invoice;
};

async function findByClientId(client_id) {
    return await db('invoices').where('client_id', client_id);
}

async function remove(id) {
    return db('invoices')
    .where('id',id)
    .del(id);
};
