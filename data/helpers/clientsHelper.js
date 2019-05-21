const db = require('../dbConfig');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
    getIdByName,
    getClientByEmail,
    getClientByName
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

async function getIdByName(client_name) {
    return await db.select('id').from('clients').where('client_name', client_name);
    //return await db('clients').where('client_name', client_name).select('id');
}

async function getClientByName(client_name) {
    return await db('clients').where('client_name', client_name);
}

async function getClientByEmail(email) {
    return await db('clients').where('email', email);
}

async function insert(client) {
    const constraintCheck = {email: false, phone: false}
    const clients = await db('clients')
    clients.forEach(curClients => {
        if (curClients.email === client.email
            && curClients.phone_number === client.phone_number) {
            constraintCheck.email = true;
            constraintCheck.phone = true;
        }
        else if (curClients.email === client.email) {
            console.log('email match')
            constraintCheck.email = true;
        }
        else if (curClients.phone_number === client.phone_number) {
            console.log('phone match')
            constraintCheck.phone = true;
        }
    })
    if (!constraintCheck.phone && !constraintCheck.email) {
        return await db('clients').insert({
            client_name: client.client_name,
            company_name: client.company_name,
            email: client.email,
            phone_number: client.phone_number,
        });
    }
    else {
        return constraintCheck;
    }
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