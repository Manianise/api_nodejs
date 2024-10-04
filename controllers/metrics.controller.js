import client from 'prom-client';

const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Prepare Prometheus metrics
export const httpRequestDurationMicroseconds = new client.Histogram({
	name: 'http_request_duration_ms',
	help: 'Duration of HTTP requests in ms',
	labelNames: ['method', 'route', 'status_code'],
	// buckets for response time from 0.1ms to 500ms
	buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
  })

// Create a Counter metric to count the number of HTTP requests
export const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'], // Labels to track specific information
  });

register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDurationMicroseconds)

// Metrics endpoint for Prometheus to scrape
export async function sendHttpMetrics(req, res) {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
  };
  
