const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./passportConfig');
const cors = require('cors');
const JWT = require('./tokenGenerator');
const deployed = 'https://keen-mestorf-44ec10.netlify.com/signin/'
const local = 'http://localhost:3000/signin/';

router.use(cors());

router.get('/', passport.authenticate('google', {scope:['profile', 'email']}));

router.get('/redirect', passport.authenticate('google', {session: false}), async (req, res) => {
    console.log(req.user[0]);
    jwt = JWT.generateToken(req.user[0]);
    res.redirect(local + jwt);
});

module.exports = router;