/*******************
 * Author: Jason Hedrick
 * Date: 4/6/2019
 * Description: A Jest test file for the invoice database helper functionality.
 */

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
        if (error) {
            res.locals.error = error;
            next();
        } 
        else {
            res.locals.decodedToken = decodedToken;
            next();
        }
    })
}