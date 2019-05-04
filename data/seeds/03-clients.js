
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('clients').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([
        {id: 1, client_name: 'Amy Porter', company_name: 'ABC Media', email: 'aporter@abcmedia.com', phone_number: '(916) 223-1234', user_id: 1},
        {id: 2, client_name: 'Gary Fitzgerald', company_name: '300 Enterprises', email: 'g.fitzgerald@300enterprises.com', phone_number: '(213) 123-5678', user_id: 2},
        {id: 3, client_name: 'Luca Nobley', company_name: 'Apex Digital', email: 'lnobley@apex.com', phone_number: '(510) 456-1234', user_id: 1},
        {id: 4, client_name: 'Leon White', company_name: 'Slate Entertianment', email: 'alwhite@slateent.com', phone_number: '(213) 423-1234', user_id: 3},
        {id: 5, client_name: 'Lenny Williams', company_name: 'Freeform', email: 'lwilliams@freeform.com', phone_number: '(713) 456-1234', user_id: 2},
        {id: 6, client_name: 'Harry Johnson', company_name: 'Exceed', email: 'harryjohnson@exceed.com', phone_number: '(342) 424-1234', user_id: 5}
      ]);
    });
};
