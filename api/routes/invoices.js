const express = require('express');
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
	accessKeyId: 'AKIA3I23NCTN3R2ZB2O2',
	secretAccessKey: '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',
	Bucket: 'paymeawsbucket'
});


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'paymeawsbucket',
    metadata: function (req, file, cb) {
      console.log('inside multer')
      console.log(file);
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname)
    }
  })
})

const profileImgUpload = multer({
  storage: multerS3({
   s3: s3,
   bucket: 'paymeawsbucket',
   acl: 'public-read',
   key: function (req, file, cb) {
    cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
   }
  }),
  limits:{ fileSize: 4000000 }, // In bytes: 4000000 bytes = 4 MB
  fileFilter: function( req, file, cb ){
   checkFileType( file, cb );
  }
 }).single('pdfFile');

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
router.get('/', async (req, res) => {
    db.getAll()
    .then(invoices => {
        res.status(200).json(invoices);
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

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

// Upload PDF invoice to AWS



 // Add invoice and PDF 
router.post('/create', upload.single('pdf'), (req, res) => {
  // I need to use the client_name to get the client_id
  console.log(req.file);
  const invoice = JSON.parse(req.body.invoice);
  clientsHelper.getIdByName(invoice.client_name)
  .then(id => {
    console.log(id);
  }) 
  console.log(invoice);
  invoice.inv_url = req.file.location;
  console.log(invoice);
  db.insert(invoice)
  .then(ids => {
      res.status(201).json({message: ids});
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
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