import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose"
//routes
import userRouter from "./routes/usersRouter.js"
// import authRouter from "./routes/authRouter.js"

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to DB")
        const app = express()
        app.use(express.json())
        app.use(cors())
        //routers
        app.use("/api/users", userRouter);
        // app.use("/api/auth", authRouter)
        const PORT = process.env.PORT || 8080
        app.listen(PORT, () => {
            console.log("Server is runnig on port: ", PORT)
        })
    })
    .catch((error) => {
        console.log({ error })
        throw new Error(error)
    })


