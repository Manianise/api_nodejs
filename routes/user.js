import express from "express";
import * as userController from '../controllers/user.controller.js'

export const usersRoute = () => {
    const router = express.Router()

    router.signUp = router.post('/sign-up', userController.signUp)
    router.login = router.post('/login', userController.login)
    
    return router
}



