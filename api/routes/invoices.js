const express = require('express');
<<<<<<< HEAD
const router = express.Router();
const db = require('../../data/helpers/invoiceHelper');
const clientsHelper = require('../../data/helpers/clientsHelper');
const authToken = require('../authorizeToken');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

/* AWS Profile File Storing */
const s3 = new aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	Bucket: process.env.AWS_BUCKET,
});

const pdfUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
    }
  }),
  limits:{ fileSize: 4000000 }, // In bytes: 4000000 bytes = 4 MB
  fileFilter: function( req, file, cb ){
    checkFileType( file, cb );
  }
}).single('pdf');

/**
* Check File Type
* @param file
* @param cb
* @return {*}
*/
function checkFileType( file, cb ){
  // Allowed ext
  const filetypes = /pdf/;
  // Check ext
  const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
  // Check mime
  const mimetype = filetypes.test( file.mimetype );
  if( mimetype && extname ){
    return cb( null, true );
  } else {
    cb( 'Error: Pdf Only!' );
  }
}

// Get a list of invoices
router.get('/', authToken, async (req, res) => {
  const user_id = res.locals.decodedToken.subject;
  db.getAll(user_id)
  .then(invoices => {
    res.status(200).json(invoices);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({errorMessage: `Server sent an error of type ${err}.`});
  })
});

// Get an invoice by id
router.get('/:id', authToken, async (req, res) => {
=======
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
>>>>>>> revert my fake commit
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
<<<<<<< HEAD
router.put('/:id', authToken, async (req, res) => {
=======
router.put('/:id',  async (req, res) => {
>>>>>>> revert my fake commit
  const { id } = req.params;
  const changes = req.body;

  await db.update(id, changes)
  .then(count => {
<<<<<<< HEAD
      if(!count || count < 1) {
        res.status(404).json({message: 'No invoice found to update'})
      } else {
        res.status(200).json(count);
      }
=======
     if(!count || count < 1) {
       res.status(404).json({message: 'No invoice found to update'})
     } else {
       res.status(200).json(count);
     }
>>>>>>> revert my fake commit
  })
  .catch(err => {
      res.status(500).json({ message: 'Sorry, the server ran into an issue'})
  })     
});

<<<<<<< HEAD
// Add invoice and PDF 
router.post('/create', [authToken, pdfUpload], (req, res) => {
  let invoice = JSON.parse(req.body.invoice);
  // We get the user_id out of the authenticated and now decoded token.
  const user_id = res.locals.decodedToken.subject;

  // Let's see if we can find an ID with this client_name that also belongs to this user
  clientsHelper.getIdByName(invoice.client_name, user_id)
  .then(id => {
    // if id.length === 0 create a new client based on the information given to us here.
    if (id.length === 0) {
      clientsHelper.insert({
        client_name: invoice.client_name,
        company_name: invoice.company_name,
        email: invoice.email,
        phone_number: invoice.phone_number,
        user_id: user_id,
      }).then(ids => { 
        // Now that we've created the new client let's add the invoice to it.
        invoice = {
          client_id: ids[0],
          invoice_number: invoice.invoice_number,
          company_name: invoice.company_name,
          notes: invoice.notes,
          inv_url: req.file.location,
        }
          db.insert(invoice)
        .then(ids => {
            res.status(201).json({message: ids});
        })
        .catch(err => {
            console.log(`Server had an error of : ${err} while trying to add an invoice to a new client.`);
            res.status(500).json(err)
        })
      })
      .catch(err => {
        console.log(`Server had an error of : ${err} while trying to create a new client.`);
        res.status(500).json(err);
      })
    }
    // This client is already attached to this user. 
    else {
      // Make sure the invoice object only contains the required invoice information.
      invoice = {
        client_id: id[0].id,
        invoice_number: invoice.invoice_number,
        company_name: invoice.company_name,
        notes: invoice.notes,
        inv_url: req.file.location,
      }
      // Attempt to insert the invoice into the invoice table
      db.insert(invoice)
        .then(ids => {
            res.status(201).json({message: ids});
        })
        .catch(err => {
            console.log(`Server had an error of : ${err} while trying to add an invoice to a client.`);
            res.status(500).json(err)
        })
      }
  })
  .catch(err => {
    console.log(`Server had an error of : ${err} while trying to find a client name by user_id.`);
    res.status(500).json(err);
  })

});

// Delete invoice
router.delete('/:id', authToken, async (req, res) =>{
=======
// Delete invoice
router.delete('/:id', async (req, res) =>{
>>>>>>> revert my fake commit
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