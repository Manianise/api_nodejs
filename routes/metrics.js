import express from "express";
import * as metricsController from '../controllers/metrics.controller.js'

export const metricsRoute = () => {
    const router = express.Router()

    router.sendHttpMetrics = router.get('/', metricsController.sendHttpMetrics)

    return router
}
