const express = require("express");
const app = express()
const PORT = process.env.PORT || 8080;

// view engine
app.set('view engine', 'ejs');
//set static route for serving files
app.use(express.static('public'));

app.get("/", (req, res) => res.render('home'))

//had something else running on 8080 port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})