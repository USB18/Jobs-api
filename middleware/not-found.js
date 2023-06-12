const { StatusCodes } = require("http-status-codes")

const notFoundMiddleware = (req, res, next) => {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Route not found' })
}

module.exports = notFoundMiddleware