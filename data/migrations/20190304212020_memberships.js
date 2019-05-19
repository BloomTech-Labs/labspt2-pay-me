
exports.up = function(knex, Promise) {
  return knex.schema.createTable('memberships', memberships =>{
    memberships.increments();
    memberships.string('plan').notNullable()
    memberships.boolean('client').notNullable();
    // If this is a single client only account then check this column.
    memberships.integer('client_id').unsigned();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('memberships')
};
