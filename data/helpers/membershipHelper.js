const db = require('../dbConfig');

module.exports = {
    addMembership,
    editMembershipPlan,
    editMembershipClient,
    deleteMembership,
    findMembership,
}

const planTypes = {
    monthly: 'monthly',
    single: 'single',
    trial: 'trial',
}

// Author: Jason Hedrick
// Plan is a string value. We expect this to be either 'monthly', 'single', 'trial' 
// All plans start at 'trial'.
// Client is a boolean. This is also either
async function addMembership(client) {
    const membership = await db('memberships').insert({'plan': planTypes.trial, 
        'client': client
    });
    return await membership[0];
}

async function editMembershipPlan(id, plan) {
    const validPlan = validPlanType(plan);
    if(validPlan === true) {
        return await db('memberships').where('id', id).insert({
            'plan': plan,
        })
    }
    else {
        return validPlan;
    }
}

async function editMembershipClient(id, client) {
    return await db('memberships').where('id', id).insert({'client': client});
}

async function deleteMembership(id) {
    return await db('memberships').where('id', id).delete();
}

async function findMembership(id) {
    return await db('memberships').where('id', id);
}

function validPlanType(plan) {
    Object.keys(planType).map(type => {
        if (plan === type) {
            return true;
        }
        else {
            return 'Invalid plan type.';
        }
    })
}