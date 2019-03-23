const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
/* Pulling in the required Routes. */
const users = require('./routes/users');
const clients = require('./routes/clients');
const invoices = require('./routes/invoices');
const payments = require('./routes/payments');
const reminders = require('./routes/reminders');
const authLocal = require('../auth/local');
const authGoogle = require('../auth/google');
const charge = require('./routes/charge');

const server = express();

server.use(express.json());
server.use(cors());
/*
server.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000 * 30,
    keys: [process.env.COOKIE_KEY],
}));


server.use(passport.session());
server.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
})); */
server.use(passport.initialize());
server.use(require("body-parser").text());

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
    res.status(200).json({server: 'up'})
});


module.exports = server;
