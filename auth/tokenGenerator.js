const JWT = require('jsonwebtoken');

module.exports = {
    generateToken,

};

function generateToken(user) {
    if (user.id && user.username) {
        const payload = {
            subject: user.id,
            username: user.username
        }

        const options = {
            jwtid: String(user.id),
            expiresIn: '30d'
        }

        return JWT.sign(payload, process.env.JWT_SECRET, options)
    }  
    else {
        return 'Invalid user.'
    }
}