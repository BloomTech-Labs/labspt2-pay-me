const express = require('express');
const invoices = require('../../data/helpers/invoiceHelper');
const router = express.Router();
const db = require('../../data/helpers/invoiceHelper');

router.get('/', async (req, res) => {
    db.getAll()
    .then(invoices => {
        res.status(200).json(invoices);
    })
    .catch(err => res.status(500).json(err))
});

// Add invoice 
router.post('/', async (req, res) => {
    const invoice = req.body;

    db.insert(invoice)
        .then(ids => {
            res.status(201).json({ mesage: 'Unable to create invoice'})
        })
        .catch(err => {
            res.status(500).json(err);
        });
})

// Get an invoice by id
router.get('/:id', async (req, res) => {
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
router.put('/:id',  async (req, res) => {
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
router.delete('/:id', async (req, res) =>{
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