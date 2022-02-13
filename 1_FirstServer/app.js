const express = require("express");
const app = express()
app.use(express.json())

const db = {
    next_uid: 3,
    beers: [
        {
            id: "1",
            name: "Pilsner"
        },
        {
            id: "2",
            name: "Saris"
        },
    ]
}

app.get("/api/beers", (req, res) => {
    res.send({ beers: db.beers });
})

app.get("/api/beer/:id", (req, res) => {
    let requestedBeer = {}
    db.beers.forEach(beer => {
        if (beer.id === req.params.id) requestedBeer = beer
    })
    res.send(requestedBeer)
})

app.post("/api/beer", (req, res) => {
    if (req.body.name !== undefined) {
        const newBeer = {
            id: db.next_uid + "",
            name: req.body.name
        }
        //increment uid
        db.next_uid++
        //store beer
        db.beers.push(newBeer);
        res.send(newBeer)
    } else {
        res.send({
            error: "Beer name not specified"
        })
    }
})

app.put("/api/beer/:id", (req, res) => {

    const beerIndex = db.beers.findIndex(beer => beer.id === req.params.id)
    //no beer with requested id
    if (beerIndex === -1) {
        res.send({
            error: `Beer with id=${req.params.id} not found`
        })
    }
    else {
        const updatedBeer = {
            ...req.body,
            id: db.beers[beerIndex].id,
        }
        //update db
        db.beers[beerIndex] = updatedBeer;
        res.send(updatedBeer)
    }
})

app.patch("/api/beer/:id", (req, res) => {

    const beerIndex = db.beers.findIndex(beer => beer.id === req.params.id)
    //no beer with requested id
    if (beerIndex === -1) {
        res.send({
            error: `Beer with id=${req.params.id} not found`
        })
    }
    else {
        const updatedBeer = {
            ...req.body,
            id: db.beers[beerIndex].id,
        }
        //update db
        db.beers[beerIndex] = updatedBeer;
        res.send(updatedBeer)
    }
})

app.delete("/api/beer/:id", (req, res) => {

    const beerIndex = db.beers.findIndex(beer => beer.id === req.params.id)
    //no beer with requested id
    if (beerIndex === -1) {
        res.send({
            error: `Beer with id=${req.params.id} not found`
        })
    }
    else {
        //update db
        db.beers = db.beers.filter(beer => beer.id !== req.params.id);
        res.send({
            message: `Beer with id=${req.params.id} was deleted successfuly`
        })
    }
})


//had something else running on 8080 port
app.listen(8081)