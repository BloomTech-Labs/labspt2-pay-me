const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/invoiceHelper');

// Get a list of invoices
router.get('/', async (req, res) => {
    db.getAll()
    .then(invoices => {
        res.status(200).json(invoices);
    })
    .catch(err => res.status(500).json(err))
});

// Add invoice 
router.post('/', async (req, res) => {
  const data = req.body;
  const invoice = {
      invoice_number: data.invoice_number,
      company_name: data.company_name,
      inv_url: data.inv_url,
      notes: '', // This needs to be fixed on the client side.
      client_id: data.client_id,
  };

  const invoiceID = await invoices.insert(invoice);
  console.log(invoiceID);
  res.send(`Testing ${invoiceID}`);
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

/**
 * Single Upload
 */
const profileImgUpload = multer({
  storage: multerS3({
   s3: s3,
   bucket: '',
   acl: 'public-read',
   key: function (req, file, cb) {
    cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
   }
  }),
  limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
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
  const filetypes = /pdf/; // const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
  // Check mime
  const mimetype = filetypes.test( file.mimetype );
 if( mimetype && extname ){
   return cb( null, true );
  } else {
   cb( 'Error: Images Only!' );
  }
 }

 // Upload PDF Route
router.post( '/invoices-pdf-upload', ( req, res ) => {
  profileImgUpload( req, res, ( error ) => {
    // console.log( 'requestOkokok', req.file );
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