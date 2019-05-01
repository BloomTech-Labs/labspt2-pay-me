const db = require('../dbConfig');

module.exports = {
    addMembership,
    editMembership,
    editClientMembership,
    deleteMembership,
    getMembership,
}

// Author: Jason Hedrick
// Plan is a string value. We expect this to be either 'monthly', 'single', 'trial' 
// All plans start at 'trial'.
// Client is a boolean. This is also either
async function addMembership(plan, client) {
    return await db('memberships').insert({'plan': plan, 
        'client': client
    });
}

async function editMembership(id, plan) {
    return await db('memberships').where('id', id).insert({
        'plan': plan,
    })
}

async function editClientMembership(id, client) {
    return await db('memberships').where('id', id).insert({'client': client});
}

async function deleteMembership(id) {
    return await db('memberships').where('id', id).delete();
}

async function findMembership(id) {
    return await db('memberships').where('id', id);
}