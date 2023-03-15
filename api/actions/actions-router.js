// Write your "actions" router here!


const express = require('express');

const {
    validateActionId,
} = require('./actions-middlware');

const Actions = require('../actions/actions-model') ;

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})


router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'something tragic happened inside the actions router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
