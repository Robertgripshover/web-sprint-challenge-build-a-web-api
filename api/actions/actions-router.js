// Write your "actions" router here!


const express = require('express');

const {
    validateActionId,
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
});

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
});


router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'something tragic happened inside the actions router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
