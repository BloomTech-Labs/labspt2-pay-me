const express = require('express');
const bcrypt = require('bcryptjs');
const JWT = require('./tokenGenerator');
const cors = require('cors');
const usersHelper = require('../data/helpers/usersHelper');

const router = express.Router();

router.use(cors());
/* 
 * Create a JWT and send it to the Frontend after successful signup or login 
 */

router.post('/signup', async (req, res) => {
    // Get the user registration information off the body.
    const user = req.body;
    // Make sure it has all the required data.
    if (user.username && user.password && user.email) {
        // Hash the password and set the hash to the user object.
        user.password = bcrypt.hashSync(user.password, 14);

        // Now we have to chain a couple promises...
        // Attempt to insert the user into the database.
        usersHelper.insert(user)
        .then(newUserID => {
            if (newUserID.duplicate) {
                res.status(400).json(newUserID);
            }
            else if (newUserID.error) {
                res.status(500).json(newUserID.error);
            }
            // Otherwise the user was created so let's get all the information available for it.
            else {
                usersHelper.findById(newUserID)
                .then(data => {
                    // Generate us a JWT to send to the client to store for sessions.
                    const token = JWT.generateToken(data[0]);
                    // Send to the client what we have on the user account and the token.
                    return res.status(200).json({data: data, token: token});
                })
            }
        })
    }
    else {
        return res.status(400).json({error: 'Signup requires a username, password and plan type.'});
    }
});

router.post('/login', (req, res) => {
    const credentials = req.body;
    if (credentials.email && credentials.password) {
        usersHelper.findByEmail(credentials.email)
        .then(user => { 
            if (!user[0] || !bcrypt.compareSync(credentials.password, user[0].password)) {
                return res.status(401).json({error: 'Invalid username or password.'})
            }
            else {
                const token = JWT.generateToken(user[0]);
                usersHelper.findById(user[0].id)
                .then(foundUser => {
                    return res.status(200).json({user: foundUser, token: token});
                })
                
            }
        })
    }
    else {
        return res.status(400).json({error: 'Login requires both an email and password.'});
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    await usersHelper.findById(id)
    .then ((user) => {
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({ message: 'Unable to find user by id'})
    })
});

module.exports = router;