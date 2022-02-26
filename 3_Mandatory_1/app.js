const express = require("express");
const app = express()
const PORT = process.env.PORT || 8080;
const { quotes } = require("./quotes.js");

// view engine
app.set('view engine', 'ejs');
//set static route for serving files
app.use(express.static('public'));

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 */
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get("/", (req, res) => {
    const randomIndex = getRandomNumber(0, 14)
    res.render('home', { quote: quotes[randomIndex] })
})

//had something else running on 8080 port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})