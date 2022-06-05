import { Router } from "express";
import { checkAdmin, checkAuth } from "../middleware/index.js";
import ChatRoom from "../models/chatRoom.js"

const router = Router();

router.get("/", checkAuth, checkAdmin, async (req, res) => {
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

router.post("/", checkAuth, async (req, res) => {
    try {
        const unixEpochTime = (Math.round((new Date()).getTime() / 1000)).toString();
        const newChatRoom = await ChatRoom.create(req.body)
        res.status(201).json({
            errors: [],
            data: null
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            errors: [error.message],
            data: null
        })
    }
})


export default router