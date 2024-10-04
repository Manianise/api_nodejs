// Main requirements
const __dirname = import.meta.dirname
import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { loadModels } from './models/index.js'
import 'dotenv/config'
const app = express()

// Routing

import { membersRoute }   from './routes/members.js'
import { usersRoute }    from './routes/user.js'
import { metricsRoute } from './routes/metrics.js'

// Metrics

import { countHttpRequests, observehttpRequestDurationMicroseconds } from "./middleware/count-http-reqs.js";
import { httpRequestCounter } from "./controllers/metrics.controller.js";
app.use(countHttpRequests)
app.use(observehttpRequestDurationMicroseconds)
setInterval(() => httpRequestCounter.reset(), 60 * 1000)

// Define rate limiting configuration
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // an hour
  max: 200, // limit each IP to 200 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

const corsOptions = {
    origin: `${process.env.ALLOW_ORIGIN_URL}, 127.0.0.1`, // Replace with your allowed origin(s)
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true // Allow credentials
};

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(cors(corsOptions))

// Documentation static html page
app.use(express.static(__dirname + '/src'))

// All requests to json
app.use(express.json())

app.use('/members', membersRoute())
app.use('/user', usersRoute())
app.use('/metrics', metricsRoute())


// Function to check the database connection
async function checkDatabaseConnection() {
  try {
    await import('./config/config.js')
        .then(sequelize => {
          sequelize.sequelize.authenticate()
          console.log(`Connexion to datbase established ! `);
          loadModels()
        })

    } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
  }
}

checkDatabaseConnection().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
});