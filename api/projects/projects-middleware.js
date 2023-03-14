// add middlewares here related to projects

const Projects = require('./projects-model')

function logger(req, res, next) {
    console.log('logger middleware')
    const timeStamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timeStamp}] ${method} to ${url}`)
    next();
}


module.exports = {
    logger,
}
