const express = require('express');

/* Pulling in the required Routes. */
const users = require('./routes/users');
const clients = require('./routes/clients');
const invoices = require('./routes/invoices');
const payments = require('./routes/payments');
const reminders = require('./routes/reminders');

const server = express();

server.use(express.json());

/* Plugging in the Routes to the correct API paths */
server.use('/api/users', users)
server.use('/api/clients', clients);
server.use('/api/invoices', invoices);
server.use('/api/payments', payments);
server.use('/api/reminders', reminders);

/* This just responds to the client letting it know that the server is up. */
server.get('/', async (req, res) => {
    res.status(200).json({server: 'up'})
});

module.exports = server;
