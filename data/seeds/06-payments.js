
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('payments').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('payments').insert([
        {id: 1, amount: 800, client_id: 1, user_id: 1, invoice_id: 1},
        {id: 2, amount: 600, client_id: 2, user_id: 2, invoice_id: 2},
        {id: 3, amount: 500, client_id: 3, user_id: 3, invoice_id: 3},
        {id: 4, amount: 600, client_id: 4, user_id: 4, invoice_id: 4},
        {id: 5, amount: 800, client_id: 5, user_id: 5, invoice_id: 5}
      ]);
    });
};
