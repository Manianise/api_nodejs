const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonPath = path.join(__dirname, '../../source_files/members.json');

console.log(jsonPath);

// Send data to /team url
router.get('/', (req, res, next) => {

    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
          res.status(500).send('Internal Server Error');
          return;
        }
        res.send(data);
      });    
})

// Setting variable for ID
router.get('/:memberID', (req, res, next) => {
    // Get param ID
    const id = req.params.memberID
    res.status(200).json({
        message: `member with id: ${id}`,
        id: id
    })
})

router.post('/', (req, res, next) => {
    const member = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        url: req.body.url
    }
    res.status(201).json({
        message: 'Member was added'
    })
})

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'Member was deleted'
    })
})

module.exports = router
