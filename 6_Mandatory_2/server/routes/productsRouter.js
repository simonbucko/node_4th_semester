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
    console.log(req.query)
    const { page, limit, priceOrder, searchText } = req.query

    const query = Product.find();
    if (searchText) {
        query.where({ name: searchText })
    }
    if (priceOrder) {
        query.sort({ price: -1 })
    }
    const products = await query.skip((page - 1) * limit).limit(limit).exec();
    const totalCount = await Product.countDocuments();


    res.status(200).json({
        errors: [],
        data: {
            products,
            totalCount
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