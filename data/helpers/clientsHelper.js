const db = require('../dbConfig');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
};

/* Clients model 
    clients.string('client_name', 128 ).notNullable()
    clients.string('company_name', 128).notNullable();
    clients.string('email').notNullable().unique();
    clients.string('phone_number').notNullable().unique();
    clients.integer('user_id').unsigned().notNullable().references('id').inTable('users');
*/

async function getAll(user_id) {
    return await db('clients').where('user_id', user_id);
}

async function insert(client) {
    return await db('clients').insert({
        client_name: client.client_name,
        company_name: client.company_name,
        email: client.email,
        phone_number: client.phone_number,
        user_id: client.user_id,
    });
}

async function update(id, client) {
    return await db('clients').where('id', id).update({
        company_name: client.company_name,
        email: client.email,
        phone_number: client.phone_number,
    })
}

async function findById(id) {
    const client = await db('clients').where('id', id);
    return await client;
}

async function remove(id) {
    return await db('clients').where('id', id).delete();
}