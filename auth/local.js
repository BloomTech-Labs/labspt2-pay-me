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
    console.log(user.plan);
    // Make sure it has all the required data.
    if (user.username && user.password && user.email && user.plan) {
        // Hash the password and set the hash to the user object.
        user.password = bcrypt.hashSync(user.password, 14);

        // Now we have to chain a couple promises...
        // Attempt to insert the user into the database.
<<<<<<< HEAD
        usersHelper.insert(user)
        .then(newUser => {
            console.log(newUser);
            console.log(newUser.id);
            // If there's an error number on the newUser object then something went wrong.
            if(newUser.message.errno) { 
=======
        await usersHelper.insert(user)
        .then(async newUser => {
            console.log(newUser)
            // If there's an error number on the newUser object then something went wrong.
            if(newUser.message.errno) {
                console.log(newUser)
>>>>>>> revert my fake commit
                // Send back the error.
                res.status(400).json(newUser.message);
            }
            // Otherwise the user was created so let's get all the information available for it.
            else {
<<<<<<< HEAD
                usersHelper.findById(newUser.id)
=======
                await usersHelper.findById(newUser.user_id)
>>>>>>> revert my fake commit
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

<<<<<<< HEAD
router.post('/login', (req, res) => {
    const credentials = req.body;
    console.log(credentials)
    if (credentials.email && credentials.password) {
        usersHelper.findByEmail(credentials.email)
        .then(user => { 
            console.log(user[0]);
=======
router.post('/login', async (req, res) => {
    const credentials = req.body;
    if (credentials.username && credentials.password) {
        await usersHelper.findByUsername(credentials)
        .then(async user => { 
>>>>>>> revert my fake commit
            if (!user[0] || !bcrypt.compareSync(credentials.password, user[0].password)) {
                return res.status(401).json({error: 'Invalid username or password.'})
            }
            else {
                const token = JWT.generateToken(user[0]);
<<<<<<< HEAD
                usersHelper.findById(user[0].id)
                .then(foundUser => {
                    return res.status(200).json({user: foundUser, token: token});
                })
                
=======
                const foundUser = await usersHelper.findById(user[0].id);
                return res.status(200).json({user: foundUser, token: token});
>>>>>>> revert my fake commit
            }
        })
    }
    else {
        return res.status(400).json({error: 'Login requires both a username and password.'});
    }
});

<<<<<<< HEAD
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    await usersHelper.findById(id)
    .then ((user) => {
        console.log(user);
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({ message: 'Unable to find user by id'})
    })
});

=======
>>>>>>> revert my fake commit
module.exports = router;