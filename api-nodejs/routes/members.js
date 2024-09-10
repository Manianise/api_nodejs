const express = require('express')
console.log(__dirname);
const membersController = require('../controllers/member.controller')

const checkAuthMiddleware = require('../middleware/check-auth')

const router = express.Router()

router.post("/", checkAuthMiddleware.checkAuth, membersController.save)
router.get("/all", checkAuthMiddleware.checkAuth, membersController.showAll)
router.get("/:id", checkAuthMiddleware.checkAuth, membersController.show)
router.get("/", checkAuthMiddleware.checkAuth, membersController.index)
router.patch("/:id", checkAuthMiddleware.checkAuth, membersController.update)
router.delete("/:id", checkAuthMiddleware.checkAuth, membersController.destroy)

module.exports = router