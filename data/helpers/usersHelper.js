const db = require('../dbConfig');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
    findByUsername,
    findByEmail,
    editUser
};

async function findByUsername(user) {
    if (user.username) {
        return await db('users').where('username', user.username);
    }
    else {
        return await db('users').where('username', user);
    }
}

async function attachToUsers(users) {
    let userObject = {user: users[0]};
    let clients = await db('clients').where('user_id', users[0].id);
    let invoices = await db('invoices');
    let memberships = await db('memberships').where('id', users[0].membership_id);

    clients = await clients.map(async client => {
        const clientInvoices = await db('invoices').where('client_id', client.id);
        client = Object.assign({}, client, clientInvoices);
    })

    userObject.clients = clients;
    console.log('users', userObject);
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
    userObject.clients = clients;
    
    return userObject;
}

async function getAll() {
    return await db('users');
    return users;
};



async function insert(user) {
    let newIDs = {membership_id: '', id: '', username: '', message: ''};
    await db('memberships').insert({plan: user.plan})
    .then(success => {
        return success;
    })
    .then(async membershipID => {
        newIDs.membership_id = membershipID[0];

        await db('users').insert(
            {username: user.username, 
            password: user.password,
            google_id: user.google_id ? user.google_id : null, 
            email: user.email, 
            membership_id: membershipID[0]})
            .then(async userID => {
                newIDs.id = userID[0];
                newIDs.username = user.username;
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

async function findByEmail(email) {
    let user = await db('users').where('email', email);
    return user;
}
async function findById(id) {
    return await db('users').where('id', id);
    //let users = await db.select('id', 'username', 'email', 'membership_id').from('users').where('id', id);
    
    //users = await attachToUsers(users);
    
    //return users;
}

async function editUser(id, updated) {
    // Added the return statement. -Jason
	return await db('users').where({ id }).update(updated, 'id');
}

async function remove(id) {

}
