const express = require('express');
const expressSession = require('express-session')
const cookieParser = require('cookie-parser');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

/*  PASSPORT SETUP  */
const passport = require('passport');
const usersHelper = require('../data/helpers/usersHelper');

router.use(cookieParser());
router.use(bodyParser());
router.use(expressSession({secret: 'development secret only pull from env later'}));
router.use(passport.initialize());
// passport.session should set a cookie and stores the user.id 
router.use(passport.session()); 


const LocalStrategy = require('passport-local').Strategy;

/*
router.get('/success', (req, res) => {
    console.log(req.query.username);
    res.status(200).json(`${req.query.username}`);
});

router.get('/error', (req, res) => res.send("error logging in"));
*/

passport.serializeUser(async function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
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
            // This message here is used for the flash messages. An express feature.
            /* 
                Express Flash Messages: 
                https://stackoverflow.com/questions/23160743/how-to-send-flash-messages-in-express-4-0 

                Flash messaging in Express 4: express-flash vs. custom middleware:
                https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423
            */
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        else {
            user = foundUser[0];
        }
        return done(null, user);
    }
));

/* Passport automatically sends a 401 forbidden response when authentication from above failed. */
router.post('/',
    passport.authenticate('local'), // < This runs the LocalStrategy we setup above.
    // If the user is authenticated the function below runs.
    function (req, res) {
        const user = {id: req.user.id, username: req.user.username, email: req.user.email, membership_id: req.user.membership_id};
        res.status(200).json(user);
    }
);

/* router.post('/', function(req, res, next) {
    passport.authenticate('local', 
    function(err, user, info) {
        if (err) { res.status(500).json({error: err}) }
        if (!user) {
            req.session.message = info.message;
            res.status(400).json({errorMessage: 'Incorrect username or password.'});
        }
    },
    req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/users/' + user.username);
    }))
    (req, res, next)
}) */
    
    /*
    function(req, res) {
        console.log(`Inside post /login ${req.user.id}`);
        res.status(200).json({message: `${req.user.username} logged in`});
    }
    */

module.exports = router;