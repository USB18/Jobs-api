const jobsSchema = require('../model/Jobs')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await jobsSchema.find({ createdBy: req.user.userId }).sort("createdAt")
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    const { params: { id: jobId },
        user: { userId } } = req
    const job = await jobsSchema.findOne({
        _id: jobId, createdBy: userId
    })

    if (!job) {
        throw new NotFoundError(`Job with id ${jobId} not found`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await jobsSchema.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    const { params: { id: jobId },
        user: { userId },
        body: { company, position } } = req

    if (company == '' || position == '') {
        throw new BadRequestError("Company and position can not be empty")
    }
    const job = await jobsSchema.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body,
        { new: true, runValidators: true })

    if (!job) {
        throw new NotFoundError(`Job with id ${jobId} not found`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const { params: { id: jobId },
        user: { userId } } = req
    const job = await jobsSchema.findByIdAndDelete({ _id: jobId, createdBy: userId })

    if (!job) {
        throw new NotFoundError(`Job with id ${jobId} not found`)
    }
    res.status(StatusCodes.OK).json({ msg: "Deleted successfully" })
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}