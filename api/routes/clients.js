<<<<<<< HEAD
"use strict"
const express = require('express');
const router = express.Router();
const auth = require('../authorizeToken');
const clientsHelper = require('../../data/helpers/clientsHelper');

router.get('/', auth, async (req, res) => {
    if (res.locals.decodedToken) {
        const token = res.locals.decodedToken;
        const clients = await clientsHelper.findById(token.subject);
        res.json(clients);
    }
=======
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).json({clients: 'Up'});
>>>>>>> revert my fake commit
});

module.exports = router;