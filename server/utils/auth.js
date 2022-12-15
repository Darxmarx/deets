// set up json web token, the secret used, and an token lifespan of 2 hours
const jwt = require('jsonwebtoken');
const secret = 'hoohooitsasecret';
const expiration = '2h';

module.exports = {
    // set up middleware that checks if there's an existing token/authorization
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token.');
        }

        return req;
    },

    // sign on a valid token
    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
}
