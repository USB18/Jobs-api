const { StatusCodes } = require('http-status-codes')
const userSchema = require('../model/Users')
const { BadRequestError, UnauthenticatedError } = require('../errors')

//register user
const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new BadRequestError("Please enter name, email and password")
    }

    const user = await userSchema.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}


//login user
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError("Please enter email and password")
    }

    const user = await userSchema.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError("Invalid credentials")
    }

    const isPsswordCorrect = await user.checkPassword(password)
    if (!isPsswordCorrect) {
        throw new UnauthenticatedError("Invalid credentials")
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = { register, login }