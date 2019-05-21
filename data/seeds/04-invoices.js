
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('invoices').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('invoices').insert([
        {id: 1, invoice_number:201903282, company_name: 'Freeform', inv_url: 'www.testurl1', notes:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', client_id: 5},
        {id: 2, invoice_number:201903284, company_name: 'Apex Media', inv_url: 'www.testurl2', notes:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', client_id: 3},
        {id: 3, invoice_number:201903285, company_name: 'ABC Media', inv_url: 'www.testurl3', notes:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', client_id: 1},
        {id: 4, invoice_number:201903283, company_name: '300 Enterprises', inv_url: 'www.testurl4', notes:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', client_id: 2},
        {id: 5, invoice_number:201903286, company_name: 'Slate Entertianment', inv_url: 'www.testurl5', notes:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', client_id:4},
        {id: 6, invoice_number:201903287, company_name: 'Proline Entertainment', inv_url: 'www.testurl6', notes:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', client_id:4},
        {id: 7, invoice_number:201903289, company_name: 'New Media Ent', inv_url: 'www.testurl7', notes:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', client_id:1},
        {id: 8, invoice_number:201903290, company_name: 'Hope Digital', inv_url: 'www.testurl8', notes:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', client_id:3},
        {id: 9, invoice_number:201903292, company_name: 'LMS Enterprises', inv_url: 'www.testurl9', notes:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', client_id:4},
        {id: 10, invoice_number:201903293, company_name: 'A1 Entertianment', inv_url: 'www.testurl10', notes:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', client_id:4},
        {id: 11, invoice_number:2019032894, company_name: 'Exceed', inv_url: 'www.testurl11', notes:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', client_id:6}
      ]);
    });
};
