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
    console.log(user.length);
    console.log(user);
    if (user.length > 0) {
        return true;
    }
    return false;
}

async function insert(user) {
    const duplicate = await checkDuplicate(user);
    if (duplicate) {
        console.log('Duplicate user found escaping insert.');
        return {duplicate: true, message: 'Duplicate username or email found.'}
    }
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
                console.log('inside user insert.')
                newIDs.id = userID[0];
                newIDs.username = user.username;
                newIDs.message = 'Account created.';
            })
            .catch(async error => {
                console.log(`User insert failed while trying to insert the user with error ${error}`)
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
