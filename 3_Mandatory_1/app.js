const express = require("express");
const app = express()
const PORT = process.env.PORT || 8080;

// view engine
app.set('view engine', 'ejs');
//set static route for serving files
app.use(express.static('public'));

//routes
app.get("/", (req, res) => {
    res.render('home')
})
app.get("/javascript", (req, res) => {
    res.render('javascript')
})
app.get("/nodejs", (req, res) => {
    res.render('nodejs')
})
app.get("/npm", (req, res) => {
    res.render('npm')
})
app.get("/restapi", (req, res) => {
    res.render('restapi')
})
app.get("/express", (req, res) => {
    res.render('express')
})
app.get("/nodemon", (req, res) => {
    res.render('nodemon')
})
app.get("/ejs", (req, res) => {
    res.render('ejs')
})

//had something else running on 8080 port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})