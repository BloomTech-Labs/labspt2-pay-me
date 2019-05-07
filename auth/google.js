const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./passportConfig');
const cors = require('cors');
const JWT = require('./tokenGenerator');

const local = 'http://localhost:3000/signin/';
const deployed = 'https://keen-mestorf-44ec10.netlify.com/signin/';

router.use(cors());

router.get('/', passport.authenticate('google', {scope:['profile', 'email']}));

router.get('/redirect', passport.authenticate('google', {session: false}), async (req, res) => {
    const jwt = JWT.generateToken({id: req.user});
    res.redirect(local + jwt);
});

module.exports = router;