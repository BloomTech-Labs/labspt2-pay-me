const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


/*  PASSPORT SETUP  */
const passport = require('passport');
const usersHelper = require('../data/helpers/usersHelper');

router.use(passport.initialize());
router.use(passport.session());
router.use(bodyParser.urlencoded({ extended: true }));

const LocalStrategy = require('passport-local').Strategy;
/* router.get('/success', (req, res) => {
    console.log(req.query);
    res.send("Welcome "+req.query.username+"!!")
}); */

/* router.get('/error', (req, res) => res.send("error logging in"));
 */
passport.serializeUser(async function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
    console.log(`inside deserialize: ${id}`)
    return await usersHelper.findById(id);
});

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(new LocalStrategy(
    /* Check for the user and do the password compare here. */
    async function(username, password, done) {
        let user = {username: username, password: password};
        const foundUser = await usersHelper.auth(user);
        // Check password / authenticate
        if (user.password !== foundUser[0].password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        else {
            user = foundUser[0];
        }
        return done(null, user);
    }
));

router.post('/',
    passport.authenticate('local', { failureMessage: 'Error logging in.'}),
    function(req, res) {
        console.log(`Inside post /login ${req.user.id}`);
        res.status(200).json({message: `${req.user.username} logged in`});
});

module.exports = router;