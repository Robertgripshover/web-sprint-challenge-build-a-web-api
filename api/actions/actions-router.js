// Write your "actions" router here!


const express = require('express');

const {
    validateActionId,
    validateNewActionDetails,
} = require('./actions-middlware');

const Actions = require('../actions/actions-model') ;

const router = express.Router();

router.get('/', async (req, res, next) => {
    try { 
        const result = await Actions.get()
        res.status(200).json(result)
        console.log(result)
    } catch (err) {
        next(err)
    }
}); //<< this is working ---

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
}); //<< this is working ---


router.post('/', validateNewActionDetails, async (req, res, next) => {
    try {
      const result = await Actions.insert({
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed
      })
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }); //<< this is working ---



  router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
      await Actions.remove(req.params.id)
      res.json(req.project)
    } catch (err) {
      next(err)
    }
  });//<< this is working ---






  router.put('/:id', validateActionId, validateNewActionDetails, (req, res, next) => {
    Actions.update(req.params.id, {
      name: req.name,
      description: req.description,
      completed: req.completed
    })
    .then(() => {
      return Actions.get(req.params.id)
    })
    .then(project => {
      res.json(project)
    })
    .catch(next)
  });//<< this is working ---








router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'something tragic happened inside the actions router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
