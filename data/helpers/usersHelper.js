const db = require('../dbConfig');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
    auth,
};

async function auth(user) {
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
    let userPromise;

    const membershipPromise = new Promise((resolve, reject) => {
        const membershipID = db('memberships').insert({plan: user.plan});
        resolve(membershipID);
        reject(membershipID);
    });

    membershipPromise.then(success => {
        /* TODO: Add error handling. */
        userPromise = new Promise((resolve, reject) => {
            const membershipID = success[0];
            const newUserId = db('users').insert(
                {username: user.username, 
                password: user.password, 
                email: user.email, 
                membership_id: membershipID});
                
                resolve(newUserId);
                reject(newUserId);
        });
    });

    return ({membershipID: await membershipPromise, userID: await userPromise});
}

async function update(id, user) {

}

async function findById(id) {
    let users = await db.select('id', 'username', 'password', 'email', 'membership_id').from('users').where('id', id);
    users = await attachToUsers(users);
    
    return users;
}

async function remove(id) {

}
