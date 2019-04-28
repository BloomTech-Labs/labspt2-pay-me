const jwt = require('jsonwebtoken');

module.exports = {
    generateToken,

};

function generateToken(user) {
    console.log(user);
    if (user.id && user.username) {
        const payload = {
            subject: user.id,
            username: user.username
        }

        const options = {
            jwtid: String(user.id),
            expiresIn: '30d'
        }

        return jwt.sign(payload, process.env.JWT_SECRET, options)
    }  
    else {
        return 'Invalid user.'
    }
}