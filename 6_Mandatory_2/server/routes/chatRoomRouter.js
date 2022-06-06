import { Router } from "express";
import { checkAdmin, checkAuth } from "../middleware/index.js";
import ChatRoom from "../models/chatRoom.js"
import { resolveAndMapUserNames } from "./functions.js"

const router = Router();

router.get("/", checkAuth, checkAdmin, async (req, res) => {
    try {
        let chatRooms = await ChatRoom.find()
        chatRooms = await resolveAndMapUserNames(chatRooms)
        res.status(200).json({
            errors: [],
            data: {
                chatRooms
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            errors: [
                {
                    msg: error.message
                }
            ],
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
            errors: [
                {
                    msg: error.message
                }
            ],
            data: null
        })
    }
})

router.get("/:socketId", checkAuth, checkAdmin, async (req, res) => {
    try {
        let chatRoom = await ChatRoom.findOne({ socketId: req.params.socketId });
        if (!chatRoom) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "Chat room not found"
                    }
                ],
                data: null
            })
        }
        res.status(200).json({
            errors: [],
            data: {
                chatRoom
            }
        })
    } catch (error) {
        res.status(404).json({
            errors: [
                {
                    msg: "Chat room not found"
                }
            ],
            data: null
        })
    }
})


export default router