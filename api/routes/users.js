const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const users = require('../../data/helpers/usersHelper');

router.get('/', async (req, res) => {
    const myUsers = await users.getAll();
    res.status(200).json(myUsers);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const myUsers = await users.findById(id);
    res.status(200).json(myUsers);
});

module.exports = router;