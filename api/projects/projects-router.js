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

module.exports = router
