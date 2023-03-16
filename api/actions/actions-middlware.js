// add middlewares here related to actions

const Actions = require('./actions-model')

function actionsLogger(req, res, next) {
    console.log('action logger middleware')
    const timeStamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timeStamp}] ${method} to ${url}`)
    next();
}


async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
            next({ status: 404, message: 'project id does not exist'})
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding project'
        })
    }
} //<< this is working ---


module.exports = {
    actionsLogger,
    validateActionId,
}

