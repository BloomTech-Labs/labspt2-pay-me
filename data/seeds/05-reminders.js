
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reminders').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('reminders').insert([
        {id: 1, invoice_number:201903281, sms_freq_label: 'weekly', email_freq_label: 'daily',ischecked_email: 'true', ischecked_sms: 'true',invoice_number: 2222222221,email_startdate:'2019-04-10T09:15:37.121Z',sms_startdate:'2019-04-10T09:15:37.121Z'},
        {id: 2, invoice_number:201903281, sms_freq_label: 'weekly', email_freq_label: 'daily',ischecked_email: 'true', ischecked_sms: 'true',invoice_number: 2222222222,email_startdate:'2019-04-10T09:15:37.121Z',sms_startdate:'2019-04-10T09:15:37.121Z'},
        {id: 3, invoice_number:201903281, sms_freq_label: 'weekly', email_freq_label: 'daily',ischecked_email: 'true', ischecked_sms: 'true',invoice_number: 2222222223,email_startdate:'2019-04-10T09:15:37.121Z',sms_startdate:'2019-04-10T09:15:37.121Z'},
        {id: 4, invoice_number:201903281, sms_freq_label: 'weekly', email_freq_label: 'daily',ischecked_email: 'true', ischecked_sms: 'true',invoice_number: 2222222224,email_startdate:'2019-04-10T09:15:37.121Z',sms_startdate:'2019-04-10T09:15:37.121Z'},
      ]);
    });
};
