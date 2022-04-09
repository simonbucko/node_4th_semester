import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose"
//routes
import authRouter from "./routes/authRouter.js"
import productsRouter from "./routes/productsRouter.js"

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to DB")
        const app = express()
        app.use(express.json())
        app.use(cors())
        //routers
        app.use("/api/auth", authRouter)
        app.use("/api/products", productsRouter)
        app.use("/test", (req, res) => { res.send("Backend is working and is ready for requests") })
        const PORT = process.env.PORT || 8000
        app.listen(PORT, () => {
            console.log("Server is runnig on port: ", PORT)
        })
    })
    .catch((error) => {
        console.log({ error })
        throw new Error(error)
    })


