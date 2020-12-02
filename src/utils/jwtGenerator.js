
const jwt = require('jsonwebtoken')
require('dotenv').config();


function jwtGenerator(id) {
    const payload = {
        user: id
    }

    return jwt.sign(payload, 'jwtSecret', {expiresIn: "24h"})
}

module.exports = jwtGenerator;