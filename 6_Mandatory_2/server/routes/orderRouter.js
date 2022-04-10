import { Router } from "express";
import Order from "../models/order.js"
import { checkAuth, checkAdmin } from "../middleware/index.js"
import { ORDER_STATUS } from "../constants/constants.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        await Order.create({ ...req.body, status: ORDER_STATUS.processing })
        //TODO:implement email sending here
        res.status(201).json({
            errors: [],
            data: null
        })
    } catch (error) {
        res.status(400).json({
            errors: [],
            data: null
        })
    }
})

export default router