const express = require('express')
const userController = require('../controllers/user.controller')
const userAuthToken = require('../middleware/check-auth')
const router = express.Router()

router.post('/sign-up', userAuthToken.checkAuth, userController.signUp)
router.post('/login', userController.login)

module.exports = router


