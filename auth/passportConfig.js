const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const usersHelper = require('../data/helpers/usersHelper');

/* passport.serializeUser(function(user, done) {
    done(null, user[0].id);
});

passport.deserializeUser(function(id, done) {
    usersHelper.findById(id)
    .then(user => {
        done(null, user);
    })
    .catch(error => {
        done(error);
    })
}); */

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async function(accessToken, refreshToken, profile, done) {
        // Check the database to see if this account has signed in before.
        await usersHelper.findByUsername(profile.displayName)
        .then(async user => {
            if (user.length > 0) {
<<<<<<< HEAD
                done(null, user[0]);
=======
                console.log(`user: ${user}`);
                done(null, user);
>>>>>>> revert my fake commit
            }
            else {
                // Add them if not.
                await usersHelper.insert(
                    {username: profile.displayName,
                    password: '',
                    google_id: profile.id,
                    email: profile.emails[0].value,
                    plan: 'none'})
<<<<<<< HEAD
                .then(user => {
                    console.log(user);
                    done(null, user);
=======
                .then(newUser => {
                    console.log(newUser);
                    done(null, newUser);
>>>>>>> revert my fake commit
                })
            }
        })
        .catch(error => {
            console.log(error);
            done(error);
        })
        
    }
));