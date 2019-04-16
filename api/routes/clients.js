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
});

module.exports = router;