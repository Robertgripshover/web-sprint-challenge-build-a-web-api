// Write your "projects" router here!

const express = require('express');

const {
    validateProjectId,
    validateProjectNameAndDescription,
    

} = require('./projects-middleware');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try { 
        const result = await Projects.get()
        res.status(200).json(result)
        console.log(result)
    } catch (err) {
        next(err)
    }
}); //<< this is working ---

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
}); //<< this is working ---






router.get('/:id/actions', async (req, res, next) => {
  try {
    const result = await Projects.getProjectActions(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}) //<< this is working ---



router.post('/', validateProjectNameAndDescription, async (req, res, next) => {
    try {
      const result = await Projects.insert({
        name: req.name,
        description: req.description,
        completed: req.completed
      })
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }); //<< this is working ---


  router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
      await Projects.remove(req.params.id)
      res.json(req.project)
    } catch (err) {
      next(err)
    }
  }); //<< this is working ---






  //One small error on here still VVVV

  router.put('/:id', validateProjectId, validateProjectNameAndDescription, (req, res, next) => {
    Projects.update(req.params.id, {
      name: req.name,
      description: req.description,
      completed: req.completed
    })
    .then(() => {
      return Projects.get(req.params.id)
    })
    .then(project => {
      res.json(project)
    })
    .catch(next)
  }); 


  //One small error on here still ^^^^



router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'something tragic happened inside the projects router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
