const express = require('express')
const app = express();

const pageRouter = require('./routes/pageRoutes'); // accesses our page routes

app.set("view engine", "ejs"); // allows us to dynamically render our html

//middleware
app.use(express.static('./public')) // serves our public assets--css, img's, js etc 
app.use(express.json()) // neccesary to send json

// ROUTES
app.get('/api', (req, res) => {
    res.send('this is a basic get request')
}) // typically this would be split up between controller and router
// but its possible to do it all in app.js file

app.post('/api', (req, res) => {
    const values = req.body;
    res.json({values, msg:'this is a basic post request'})
    // ^ returns the body and message in json format
})

app.use('/', pageRouter); //routes our html/ejs files -- look in router folder for more info

// SERVER
const port = 3001
app.listen(port, () => {
     console.log(`server listening on port ${port}`)
})