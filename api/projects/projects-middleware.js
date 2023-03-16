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









async function validateProjectNameAndDescription(req, res, next) {
    try { 
        const {name, description, completed} = req.body
        console.log(req.body)
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
    } catch (err) {
        res.status(500).json({
            message: "got to here with the error"
        })
    }

} 

// function validateName(req, res, next) {
//    const {name} = req.body
//    if(!name || !name.trim()) {
//     res.status(400).json({
//         message: "missing required name field"
//     })
//    } else {
//     req.name = name.trim()
//     next()
//    }
// }

// function validateDescription(req, res, next) {
//     const {description} = req.body
//     if(!description || !description.trim()) {
//      res.status(400).json({
//          message: "missing required description field"
//      })
//     } else {
//      req.description = description.trim()
//      next()
//     }
//  }















module.exports = {
    logger,
    validateProjectId,
    validateProjectNameAndDescription,


}
