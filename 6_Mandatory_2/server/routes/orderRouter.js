import { Router } from "express";
import Order from "../models/order.js"
import { ORDER_STATUS } from "../constants/constants.js";
import { sendMail } from "../utils/mailSender/index.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const newOrder = await Order.create({ ...req.body, status: ORDER_STATUS.processing })
        await sendMail(req.body.email, newOrder._id, req.body.deliveryAddress)
        res.status(201).json({
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

router.post("/mail", async (req, res) => {
    try {
        await sendMail("bucino.36@gmail.com", 123, "Buzulucka")
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