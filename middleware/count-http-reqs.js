import { httpRequestCounter, httpRequestDurationMicroseconds } from '../controllers/metrics.controller.js'

// Middleware to count HTTP requests
export const countHttpRequests = (req, res, next) => {
    res.on('finish', () => {
      httpRequestCounter
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .inc();
    });
    next();
  };

  export const observehttpRequestDurationMicroseconds = (req, res, next) => {
    res.on('finish', () => {
        httpRequestDurationMicroseconds
            .labels(req.method, req.route?.path || req.path, res.statusCode)
            .observe(1000)
    });
    next();
  };
