import express from "express";
import * as membersController from '../controllers/member.controller.js'
import { checkAuth } from '../middleware/check-auth.js'

export const membersRoute = () => {
    const router = express.Router()

    router.save = router.post("/",checkAuth, membersController.save)
    router.showAll = router.get("/all", checkAuth, membersController.showAll)
    router.show = router.get("/:id", checkAuth, membersController.show)
    router.index = router.get("/", checkAuth, membersController.index)
    router.update = router.patch("/:id", checkAuth, membersController.update)
    router.destroy = router.delete("/:id", checkAuth, membersController.destroy)

    return router
} 
