const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit');

const membersRoute = require('./routes/members')
const usersRoute = require('./routes/users')

// Define rate limiting configuration
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // an hour
  max: 200, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

const corsOptions = {
    origin: 'https://cabinetlaclef.com', // Replace with your allowed origin(s)
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true // Allow credentials
};

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(cors(corsOptions))

// Documentation static html page
app.use(express.static(__dirname + '/src'))

app.use(bodyParser.json())

app.use("/members", membersRoute)
app.use("/user", usersRoute)


app.listen(port, () => {console.log(`listening on port : ${port} at http://localhost:3000`)})