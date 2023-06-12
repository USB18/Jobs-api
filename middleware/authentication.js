const User = require('../model/Users')
const { UnauthenticatedError } = require("../errors")
const jwt = require('jsonwebtoken')


const authenticate = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith('Bearer')) {
        throw new UnauthenticatedError("Authentication invalid")
    }

    const token = authorization.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECERT)

        //attach user to the job routes
        req.user = { userId: payload.userId, name: payload.name }
        next()
    } catch (error) {
        throw new UnauthenticatedError("Authentication invalid")
    }
}

module.exports = authenticate