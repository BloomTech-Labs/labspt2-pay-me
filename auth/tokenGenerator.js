const jwt = require('jsonwebtoken');

module.exports = {
    generateToken,

};

function generateToken(user) {
    console.log('in generate token' + user.id);
    if (user.id) {
        const payload = {
            subject: user.id,
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