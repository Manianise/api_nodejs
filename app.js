const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const productRoutes = require('./api/routes/team')
const clientsRoutes = require('./api/routes/clients')

app.use(morgan('dev'))

// Make json easy to read
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Routes handling requests
app.use('/team', productRoutes)
app.use('/clients', clientsRoutes)

// Read the README.md file
const readmePath = path.join(__dirname, 'README.md');

// Set Homepage
app.get('/', (req, res) => {
    // Serve the README.md file for the root URL
    fs.readFile(readmePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Internal Server Error');
        return;
      }
      const html = marked.parse(data)
      res.send(html);
    });
  });


app.use((req,res,next) =>{
    const error = new Error('NotFound')
    error.status = 404
    next(error)
})

app.use((error,res,next) =>{
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app

