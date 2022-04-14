import { Router } from "express";
import Order from "../models/order.js"
import { checkAuth, checkAdmin } from "../middleware/index.js"
import { ORDER_STATUS } from "../constants/constants.js";
import { sendMail } from "../utils/mailSender/index.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const newOrder = await Order.create({ ...req.body, status: ORDER_STATUS.processing })
        //only send mail if mail exist on request
        sendMail("bucino.36@gmail.com", newOrder._id)
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

export default router