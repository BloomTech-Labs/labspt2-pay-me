
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reminders').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('reminders').insert([
        {id: 1, invoice_number:201903281, frequency_text: 'Monday', frequency_email: 'Monday', custom_text: 'Monday', start_date: '2019-01-20',invoices_id: 1},
        {id: 2, invoice_number:201903282,frequency_text: 'Monday', frequency_email: 'Monday', custom_text: 'Monday', start_date: '2019-01-20',invoices_id: 2},
        {id: 3, invoice_number:201903283, frequency_text: 'Tuesday', frequency_email: 'Monday', custom_text: 'Monday', start_date: '2019-01-20',invoices_id: 3},
        {id: 4, invoice_number:201903284, frequency_text: 'Monday', frequency_email: 'Monday', custom_text: 'Monday', start_date: '2019-01-20',invoices_id: 4},
        {id: 5, invoice_number:201903285, frequency_text: 'Wednesday', frequency_email: 'Monday', custom_text: 'Monday', start_date: '2019-01-20',invoices_id: 5},
      ]);
    });
};
