const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./passportConfig');
const cors = require('cors');
const JWT = require('./tokenGenerator');

<<<<<<< HEAD
const local = 'http://localhost:3000/signin/';
const deployed = 'https://keen-mestorf-44ec10.netlify.com/signin/';

=======
>>>>>>> revert my fake commit
router.use(cors());

router.get('/', passport.authenticate('google', {scope:['profile', 'email']}));

router.get('/redirect', passport.authenticate('google', {session: false}), async (req, res) => {
<<<<<<< HEAD
    console.log(req.user[0]);
    jwt = JWT.generateToken(req.user[0]);
    res.redirect(local + jwt);
=======
    jwt = JWT.generateToken(req.user[0]);
    res.redirect('http://localhost:3000/signin/' + jwt);
>>>>>>> revert my fake commit
});

module.exports = router;