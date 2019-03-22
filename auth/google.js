const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./passportConfig');
const cors = require('cors');

router.use(passport.initialize());
router.get('/', passport.authenticate('google', {scope:['profile', 'email']}));
// passport.authenticate('google')
router.get('/redirect', passport.authenticate('google', {session: false}), async (req, res) => {
    console.log(req.query);
    res.json(req.query);
});

module.exports = router;