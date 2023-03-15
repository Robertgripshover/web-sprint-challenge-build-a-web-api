// Write your "projects" router here!

const express = require('express');

const {
    validateProjectId,
} = require('./projects-middleware');

const Projects = require('./projects-model');
const Actions = require('../actions/actions-model') ;

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'something tragic happened inside the projects router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
