const express = require('express')
const router = express.Router()

// Handling get requests
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET requests to /clients'
    })
})

// Setting variable for ID
router.get('/:clientID', (req, res, next) => {
    // get param ID
    const id = req.params.clientID
    res.status(200).json({
        message: `member with id: ${id}`,
        id: id
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Client added'
    })
})

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'Client deleted'
    })
})


module.exports = router
