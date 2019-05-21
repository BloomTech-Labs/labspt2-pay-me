
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reminders', reminders =>{
    reminders.increments();
    reminders.dateTime('sms_startdate');
    reminders.dateTime('email_startdate');
    reminders.string('sms_freq_label');
    reminders.string('email_freq_label');
    reminders.boolean('ischecked_email').notNullable();
    reminders.boolean('ischecked_sms').notNullable();
    reminders.integer('invoice_number').unsigned().unique().notNullable().references('invoice_number').inTable('invoices');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('reminders');
};
