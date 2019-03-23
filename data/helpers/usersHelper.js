const db = require('../dbConfig');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
    findByUsername,
};

async function findByUsername(user) {
    return await db('users').where('username', user.username);
}

async function attachToUsers(users) {
    let clients = await db('clients');
    let invoices = await db('invoices');
    let memberships = await db('memberships');
    /* Attach membership plan to users */
    memberships.map(membership => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].membership_id === membership.id) {
                users[i] = Object.assign({}, users[i], {plan: membership.plan});
            }
        }
    });
    /* Attach invoices to clients */
    invoices.map(invoice => {
        for(let i = 0; i < clients.length; i++) {
            if (invoice.client_id === clients[i].id) {
                clients[i] = Object.assign({}, clients[i], {invoice})
            }
        }
    }) 

    /* Attach clients to users */
    clients.map(client => {
        for(let i = 0; i < users.length; i++) {
            if(client.client_id === users[i].id) {
                users[i] = Object.assign({}, users[i], {client})
            }
        }
    })
    
    return users;
}

async function getAll() {
    let users = await db.select('id', 'username', 'password', 'email', 'membership_id').from('users');
    users = await attachToUsers(users);

    return users;
}

async function insert(user) {
    let newIDs = {membership_id: '', user_id: '', message: ''};

    await db('memberships').insert({plan: user.plan})
    .then(success => {
        return success;
    })
    .then(async membershipID => {
        newIDs.membership_id = membershipID[0];

        await db('users').insert(
            {username: user.username, 
            password: user.password, 
            email: user.email, 
            membership_id: membershipID[0]})
            .then(userID => {
                newIDs.user_id = userID[0];
                newIDs.message = 'Account created.';
            })
            .catch(async error => {
                newIDs.message = {errno: error.errno, code: error.code };
                await db('memberships').where('id', newIDs.membership_id).delete();
                newIDs.membership_id = '';
            })
    })
    .catch(async error => {
        newIDs.message = {errno: error.errno, code: error.code };
        await db('memberships').where('id', newIDs.membership_id).delete();
        newIDs.membership_id = '';
    })

    return newIDs;
}

async function update(id, user) {

}

async function findById(id) {
    let users = await db.select('id', 'username', 'email', 'membership_id').from('users').where('id', id);
    users = await attachToUsers(users);
    
    return users;
}

async function remove(id) {

}
