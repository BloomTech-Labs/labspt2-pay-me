const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
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
        const id = user.id;

        if(req.body.oldPassword) {
            if(bcrypt.compareSync(req.body.oldPassword, user.password)) {
                hash = bcrypt.hashSync(req.body.newPassword);
                // update object
                const edit = {
                    email: req.body.email,
                    password: hash
                };
                
                //db function to update user
                db.editUser(id, edit)
                .then((updated) => {
                    if (updated) {
                        res.status(200).json({
                            message:'User is updated'
                        });
                    } else {
                        res.status(404).json({ error: 'User is missong!'})
                    }
                })
                .catch((error) => {
                    next('h500', err)
                });
            } else {
                res.status(401).json({ error: 'The password you entered is incorrect'});
            }
        }
    })
});

module.exports = router;