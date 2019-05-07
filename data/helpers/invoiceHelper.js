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
    return await db('invoices').where('user_id', userID)
    .leftJoin('clients', 'clients.id', 'invoices.client_id');
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
    return await db('invoices')
    .where('id', id)
    .first()
};

async function findByClientId(client_id) {
    return await db('invoices').where('client_id', client_id);
}

async function remove(id) {
    return db('invoices')
    .where('id',id)
    .del(id);
};
