// Write your "projects" router here!

const express = require('express');

const {
    validateProjectId,
} = require('./projects-middleware');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try { 
        const result = await Projects.get({
            project: req.body
        })
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
});

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'something tragic happened inside the projects router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
