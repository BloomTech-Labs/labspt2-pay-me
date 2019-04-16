const express = require('express');
const invoices = require('../../data/helpers/invoiceHelper');
const router = express.Router();
const db = require('../../data/helpers/invoiceHelper');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');


// Get a list of invoices
router.get('/', async (req, res) => {
    db.getAll()
    .then(invoices => {
        res.status(200).json(invoices);
    })
    .catch(err => res.status(500).json(err))
});

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

// Upload PDF invoice to AWS

/* AWS Profile File Storing */
const s3 = new aws.S3({
	accessKeyId: 'AKIA3I23NCTN3R2ZB2O2',
	secretAccessKey: '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',
	Bucket: 'paymeawsbucket'
});

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
 }).single('profileImage');

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

 // Add invoice and PDF 
router.post('/create', (req, res) => {
  const invoice = req.body;
  console.log(req.body)
 
  db.insert(invoice)
  .then(ids => {
      res.status(201).json({message: ids});
  })
  .catch(err => {
      res.status(500).json(err)
  })
 
/*
  profileImgUpload( req, res, ( error ) => {
    console.log( 'requestOkokok', req.file );
    // console.log( 'error', error );
    if( error ){
     console.log( 'errors', error );
     res.json( { error: error } );
    } else {
     // If File not found
     if( req.file === undefined ){
      console.log( 'Error: No File Selected!' );
      res.json( 'Error: No File Selected' );
     } else {
      // If Success
      const imageName = req.file.key;
      const imageLocation = req.file.location;
  // Save the file name into database into profile model
  res.json( {
       image: imageName,
       location: imageLocation
      } );
     }
    }
   });
  */
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