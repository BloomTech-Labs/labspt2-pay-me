
exports.up = function(knex, Promise) {
  return knex.schema.createTable('invoices', invoices =>{
    invoices.increments();
    invoices.integer('invoice_number').notNullable()
    invoices.string('company_name', 128).notNullable();
    invoices.string('inv_url').notNullable().unique();
    invoices.string('notes').notNullable();
    invoices.decimal('amount').notNullable();
    invoices.integer('client_id').unsigned().notNullable().references('id').inTable('clients');
    invoices.integer('user_id').unsigned().notNullable().references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('invoices')
};
