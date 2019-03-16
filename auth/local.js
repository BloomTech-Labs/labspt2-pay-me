const express = require('express');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const usersHelper = require('../data/helpers/usersHelper');

const router = express.Router();

/* 
 * Create a JWT and send it to the Frontend after successful signup or login 
 */

router.post('/signup', async (req, res) => {
    const user = req.body;
    if (user.username && user.password && user.plan) {
        user.password = bcrypt.hashSync(user.password, 14);
        const newUser = await usersHelper.insert(user);
        console.log(newUser.membershipID[0]);
        const foundUser = await usersHelper.findById(newUser.membershipID[0])
        return res.status(200).json(foundUser);
    }
    else {
        return res.status(400).json({error: 'Signup requires a username, password and plan type.'});
    }
});

router.post('/login', async (req, res) => {
    const credentials = req.body;
    if (credentials.username && credentials.password) {
        const user = await usersHelper.findByUsername(credentials);
        if (!user || !bcrypt.compareSync(credentials.password, user[0].password)) {
            return res.status(401).json({error: 'Invalid username or password.'})
        }
        else {
            const data = await usersHelper.findById(user[0].id);
            return res.status(200).json(data);
        }
    }
    else {
        return res.status(400).json({error: 'Login requires both a username and password.'});
    }
});

module.exports = router;