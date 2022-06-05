import { Router } from "express";
import ChatRoom from "../models/chatRoom.js"

const router = Router();

router.get("/", async (req, res) => {
    try {
        const chatRooms = await ChatRoom.find();
        res.status(200).json({
            errors: [],
            data: {
                chatRooms
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            errors: [error.message],
            data: null
        })
    }
})

router.post("/", async (req, res) => {
    try {
        const unixEpochTime = (Math.round((new Date()).getTime() / 1000)).toString();
        const newChatRoom = await ChatRoom.create({
            customerId: "adam",
            socketId: "adam",
            roomId: "adam",
            hasUnreadMessages: true,
            messages: [{
                sender: "me",
                timestamp: unixEpochTime
            }]
        })
        res.status(200).json({
            errors: [],
            data: null
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            errors: [],
            data: null
        })
    }
})


export default router