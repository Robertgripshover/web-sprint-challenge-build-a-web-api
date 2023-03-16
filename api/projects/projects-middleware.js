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


async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if(!project) {
            next({ status: 404, message: 'project id does not exist'})
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding project'
        })
    }
} //<< this is working ---

function validateProjectNameAndDescription(req, res, next) {
 
        const {name, description, completed} = req.body
        
    if(!name || !description) {
        res.status(400).json({
            message: 'missing name or description'
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    } 

}  //<< this is working ---






module.exports = {
    logger,
    validateProjectId,
    validateProjectNameAndDescription,


}
