import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose"
import { Server } from "socket.io";
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
        //set up express app
        app.use(express.json())
        app.use(cors())
        //set up sockets
        const SOCKET_PORT = process.env.SOCKET_PORT || 8001
        const io = new Server(SOCKET_PORT, {
            cors: {
                origin: ['http://localhost:8080']
            }
        });
        io.of("/socket/chatrooms").on("connection", (socket) => {
            console.log("socket.io: User connected: ", socket.id);

            socket.on("disconnect", () => {
                console.log("socket.io: User disconnected: ", socket.id);
            });
        });
        //routers
        app.use("/api/auth", authRouter)
        app.use("/api/products", productsRouter)
        app.use("/api/order", orderRouter)
        app.use("/api/chatrooms", chatRoomRouter)
        app.use("/test", (req, res) => { res.send("Backend is working and is ready for requests") })
        //spin up the server
        const PORT = process.env.PORT || 8000
        app.listen(PORT, () => {
            console.log("Server is runnig on port: ", PORT)
            console.log("Socket server is running on port: ", SOCKET_PORT)
        })
        //listen to chatroom changes
        const db = mongoose.connection;
        const collection = db.collection('chatrooms');
        const changeStream = collection.watch();
        changeStream.on('change', next => {
            console.log(next)
            switch (next.operationType) {
                case 'insert': {
                    const { fullDocument: chatRoom } = next
                    console.log(chatRoom)
                    break;
                }
                default: {

                    break;
                }
            }
        });
    })
    .catch((error) => {
        console.log({ error })
        throw new Error(error)
    })


