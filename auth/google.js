const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./passportConfig');
const cors = require('cors');
const JWT = require('./tokenGenerator');

router.get('/', passport.authenticate('google', {scope:['profile', 'email']}));

router.get('/redirect', passport.authenticate('google'), async (req, res) => {
    jwt = JWT.generateToken(req.user[0]);
    res.redirect('http:localhost:3000/signin?=' + jwt);
});

module.exports = router;