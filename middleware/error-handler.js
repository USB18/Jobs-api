const { StatusCodes } = require("http-status-codes")
const { CustomApiError } = require("../errors")

const errorHandlerMiddleware = (err, req, res, next) => {
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later"
    }

    //don't need when we are using custom error
    // if (err instanceof CustomApiError) {
    //     return res.status(err.statusCode).json({ msg: err.message })
    // }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value for ${Object.keys(err.keyValue)} field`,
            customError.statusCode = 400
    }

    return res.status(customError.statusCode).json({ msg: customError.msg })
    //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
}


module.exports = errorHandlerMiddleware