const db = require('../dbConfig');
const memberships = require('./membershipHelper');
const clients = require('./clientsHelper');

module.exports = {
    insert,
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

async function getAll() {
    return await db('users');
};

async function checkDuplicate(user) {
    if (await checkDuplicateEmail(user.email) || await checkDuplicateUsername(user.username)) {
        return true;
    }
    return false;
}

async function checkDuplicateEmail(email) {
    const user = await db('users').where('email', email);
    if (user.length > 0) {
        return true;
    }
    return false;
}

async function checkDuplicateUsername(username) {
    const user = await db('users').where('username', username);
    if (user.length > 0) {
        return true;
    }
    return false;
}

async function insert(user) {
    const duplicate = await checkDuplicate(user);
    let client = null, newUser = null;
    const newIDs = {
        membership_id: null,
        id: null,
        errorMessage: '',
    }

    if (duplicate) {
        console.log('Duplicate user found escaping insert.');
        return {duplicate: true, message: 'Duplicate username or email found.'}
    }

    // Check if this username and email are in the clients table
    client = await clients.getClientByName(user.username);
    client = await clients.getClientByEmail(user.email);

    if (client.length > 0) {
        newIDs.membership_id = await memberships.addMembership(true);
        newUser = await db('users').insert({
            username: user.username,
            email: user.email,
            password: user.password,
            membership_id: await newIDs.membership_id,
            client_id: await client[0].id,
        })
        .catch(err => {
            console.log('An error occured inserting a user.');
            return {error: err}
        })
    }
    else {
        newIDs.membership_id = await memberships.addMembership(false);
        newUser = await db('users').insert({
            username: user.username,
            email: user.email,
            password: user.password,
            membership_id: await newIDs.membership_id,
        })
        .catch(err => {
            console.log('An error occured inserting a user.');
            return {error: err}
        })
    }
    return await newUser[0];
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
