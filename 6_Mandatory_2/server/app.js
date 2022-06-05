import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose"
//routes
import authRouter from "./routes/authRouter.js"
import orderRouter from "./routes/orderRouter.js"
import productsRouter from "./routes/productsRouter.js"
import chatRoomRouter from "./routes/chatRoomRouter.js"

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then((mongoose) => {
        console.log("Connected to DB")
        const app = express()
        app.use(express.json())
        app.use(cors())
        //routers
        app.use("/api/auth", authRouter)
        app.use("/api/products", productsRouter)
        app.use("/api/order", orderRouter)
        app.use("/api/chatrooms", chatRoomRouter)
        app.use("/test", (req, res) => { res.send("Backend is working and is ready for requests") })
        const PORT = process.env.PORT || 8000
        app.listen(PORT, () => {
            console.log("Server is runnig on port: ", PORT)
        })

        console.log(mongoose)

        const db = mongoose.connection;
        const collection = db.collection('chatrooms');
        const changeStream = collection.watch();
        changeStream.on('change', next => {
            console.log("we have change")
        });
    })
    .catch((error) => {
        console.log({ error })
        throw new Error(error)
    })


