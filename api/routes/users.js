const express = require('express');
const router = express.Router();
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

router.post('/', async (req, res) => {
    // Make sure if we DO end up handling passwords to come back and ensure that we hash and salt this thing.
    const newUser = req.body;
    const idAdded = await users.insert(newUser);
    console.log(idAdded);
    res.status(200).json(idAdded);
});

module.exports = router;