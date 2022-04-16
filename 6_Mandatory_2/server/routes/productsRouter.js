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

    res.status(200).json({
        errors: [],
        data: {
            products
        }
    })
})

router.get("/:productId", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "Product not found"
                    }
                ],
                data: null
            })
        }
        res.status(200).json({
            errors: [],
            data: {
                product
            }
        })
    } catch (error) {
        res.status(404).json({
            errors: [
                {
                    msg: "Product not found"
                }
            ],
            data: null
        })
    }
})

export default router