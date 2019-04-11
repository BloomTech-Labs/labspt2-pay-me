const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
<<<<<<< HEAD
const db = require('../../data/helpers/usersHelper');

router.get('/', async (req, res) => {
    db.getAll()
    .then((users) => {
        res.status(200).json(users)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    await db.findById(id)
    .then ((user) => {
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({ message: 'Unable to find user by id'})
    })
});

router.put('/:id', (req, res, next) => {
    db.findById(req.body.id || req.params.id).then((user) => {
        const id = user[0].id; // Get the first user in the array
        console.log(user);
        // The old password was being sent as old_password. This whole check failed - Jason
        if(req.body.old_password) {
            // Reminder: the database sends objects back in arrays
            if(bcrypt.compareSync(req.body.old_password, user[0].password)) { // get the first user in the array
                const hash = bcrypt.hashSync(req.body.new_password);
                // update object
                const edit = {
                    email: req.body.email,
                    password: hash
                };
                console.log(id, edit)
                //db function to update user
                db.editUser(id, edit)
                .then((updated) => {
                    console.log(updated)
                    if (updated) {
                        res.status(200).json({
                            message:'User is updated'
                        });
                    } else {
                        res.status(404).json({ error: 'User is missing!'})
                    }
                })
                .catch((error) => {
                    next('h500', error)
                });
            } else {
                res.status(401).json({ error: 'The password you entered is incorrect'});
            }
        }
    })
=======
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
>>>>>>> revert my fake commit
});

module.exports = router;