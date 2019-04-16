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
                done(null, user);
            }
            else {
                // Add them if not.
                await usersHelper.insert(
                    {username: profile.displayName,
                    password: '',
                    google_id: profile.id,
                    email: profile.emails[0].value,
                    plan: 'none'})
                .then(newUser => {
                    done(null, newUser);
                })
            }
        })
        .catch(error => {
            console.log(error);
            done(error);
        })
        
    }
));