const db = require('../dbConfig');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findByClientId,
    findById,
};

async function getAll() {
   return db("invoices");
}

async function insert(invoice) {
   return db("invoices").insert(invoice);
}

async function update(client_id, invoice) {
   return db("invoices").where("client_id", client_id).update(invoice);
}

async function findById(id) {
   return db("invoices").where("id", id);
}

async function findByClientId(client_id) {
   return db("invoices").where("client_id", client_id);
}

async function remove(id) {
   return db("invoices").where("id", id).del();
}