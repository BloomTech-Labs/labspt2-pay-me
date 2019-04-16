const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/invoiceHelper');
const clientsHelper = require('../../data/helpers/clientsHelper');
const authToken = require('../authorizeToken');

const usersHelper = require('../../data/helpers/usersHelper');

// Get all the clients that are part of this user
// Get all the invoices that are part of those clients
// Attach all the invoices to an object and send it to the frontend.
router.get('/', authToken, async (req, res) => {
  //res.locals.decodedToken.subject
  const user_id = res.locals.decodedToken.subject;
  
  //const clients = await clientsHelper.getAll(user_id);
    db.getAll()
    .then(invoices => {
        res.status(200).json(invoices);
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

// Add invoice 
router.post('/', authToken, async (req, res) => {
  const invoice = req.body;
  console.log('inside post invoices', invoice);
  db.insert(invoice)
      .then(ids => {
          res.status(201).json({ message: ids})
      })
      .catch(err => {
          res.status(500).json(err);
      });
})

// Get an invoice by id
router.get('/:id', authToken, async (req, res) => {
  const { id } = req.params;

  await db.findById(id)
  .then(invoices => {
      res.json(invoices)
  })
  .catch(err => {
      res.status(500).json({ message: 'Unable to find invoice by id'})
  })     
});

// Update invoice
router.put('/:id', authToken, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  await db.update(id, changes)
  .then(count => {
     if(!count || count < 1) {
       res.status(404).json({message: 'No invoice found to update'})
     } else {
       res.status(200).json(count);
     }
  })
  .catch(err => {
      res.status(500).json({ message: 'Sorry, the server ran into an issue'})
  })     
});

// Delete invoice
router.delete('/:id', authToken, async (req, res) =>{
    const { id } = req.params;

    await db.remove(id)
    .then(invoice =>{
      res.status(201).json(invoice)
    })
    .catch(err =>{
      res.status(500).json({error:'unable to delete invoice'})
    })
  });

module.exports = router;