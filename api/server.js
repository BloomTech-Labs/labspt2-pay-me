const express = require('express');
const cors = require('cors');
const passport = require('passport');
const formData = require('express-form-data')
/* Pulling in the required Routes. */
const users = require('./routes/users');
const clients = require('./routes/clients');
const invoices = require('./routes/invoices');
const payments = require('./routes/payments');
const reminders = require('./routes/reminders');
const authLocal = require('../auth/local');
const authGoogle = require('../auth/google');
const charge = require('./routes/charge');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

const server = express();

server.use(express.json());
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.use(passport.initialize());
server.use(cors());
server.use(require("body-parser").text());
server.use(formData.parse());

/* Plugging in the Routes to the correct API paths */

server.use('/api/users', users)
server.use('/api/clients', clients);
server.use('/api/invoices', invoices);
server.use('/api/payments', payments);
server.use('/api/reminders', reminders);
server.use('/auth/local/', authLocal);
server.use('/auth/google/', authGoogle);
server.use('/charge', charge);

/* This just responds to the client letting it know that the server is up. */
server.get('/', async (req, res) => {
    res.status(200).json({server: 'Updated: 3/24/19'})
});


module.exports = server;
