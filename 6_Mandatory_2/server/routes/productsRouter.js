import { Router } from "express";
import Product from "../models/product.js"
import { checkAuth, checkAdmin } from "../middleware/index.js"

const router = Router();

router.post("/", checkAuth, checkAdmin, async (req, res) => {
    await Product.create(req.body)

    res.status(201).json({
        errors: [],
        data: null
    })
})

router.get("/", async (req, res) => {
    const products = await Product.find();

    res.status(201).json({
        errors: [],
        data: {
            products
        }
    })
})



export default router