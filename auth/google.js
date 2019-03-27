const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./passportConfig');
const cors = require('cors');
const JWT = require('./tokenGenerator');

const local = 'http://localhost:3000/signin/';
const deployed = 'https://keen-mestorf-44ec10.netlify.com/';
const redirect = deployed;
router.use(cors());

router.get('/', passport.authenticate('google', {scope:['profile', 'email']}));

router.get('/redirect', passport.authenticate('google', {session: false}), async (req, res) => {
    jwt = JWT.generateToken(req.user[0]);
    res.redirect(deployed + jwt);
});

module.exports = router;