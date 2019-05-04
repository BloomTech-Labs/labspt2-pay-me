
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('memberships').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('memberships').insert([
        {id: 1, plan: 'Monthly'},
        {id: 2, plan: 'Single Client'}
      ]);
    });
};
