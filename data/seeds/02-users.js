
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'milajohnson', password: '123456', email: 'milajohnson@gmail.com', google_id:'milaj', membership_id: 1 },
        {id: 2, username: 'cwillians', password: '123456', email: 'cwilliams@aol.com', google_id:'ceecee', membership_id: 2 },
        {id: 3, username: 'kiarajoyner', password: '123456', email: 'kjoyner@gmail.com', google_id:'kiara', membership_id: 1 },
        {id: 4, username: 'cecelomeil', password: '123456', email: 'cecelomeil@gmail.com', google_id:'ceeceef', membership_id: 1 },
        {id: 5, username: 'kharrison', password: '123456', email: 'kharrison@gmail.com', google_id:'k_harrison', membership_id: 1 },
        {id: 6, username: 'mjones', password: '123456', email: 'mjones@gmail.com', google_id:'jones_m', membership_id: 2 },
        {id: 7, username: 'leroyromel', password: '123456', email: 'lromel@gmail.com', google_id:'leroy', membership_id: 1 },
      ]);
    });
};
