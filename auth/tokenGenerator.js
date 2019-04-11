<<<<<<< HEAD
const jwt = require('jsonwebtoken');
=======
const JWT = require('jsonwebtoken');
>>>>>>> revert my fake commit

module.exports = {
    generateToken,

};

function generateToken(user) {
<<<<<<< HEAD
    console.log(user);
=======
>>>>>>> revert my fake commit
    if (user.id && user.username) {
        const payload = {
            subject: user.id,
            username: user.username
        }

        const options = {
            jwtid: String(user.id),
            expiresIn: '30d'
        }

<<<<<<< HEAD
        return jwt.sign(payload, process.env.JWT_SECRET, options)
=======
        return JWT.sign(payload, process.env.JWT_SECRET, options)
>>>>>>> revert my fake commit
    }  
    else {
        return 'Invalid user.'
    }
}