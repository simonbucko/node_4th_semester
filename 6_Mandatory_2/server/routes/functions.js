import JWT from "jsonwebtoken"
import Order from "../models/order.js"
import Product from "../models/product.js"


export const respondWithUser = async (res, status, user, tokenExpirecy = 1000000) => {
    const token = await JWT.sign(
        { email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
            expiresIn: tokenExpirecy
        }
    )
    const orders = await getAllUsersOrders(user._id);
    res.status(status).json({
        errors: [],
        data: {
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                token,
                isAdmin: user.isAdmin,
                orders,
            }
        }
    })
}

const getAllUsersOrders = async (userId) => {
    let orders = await Order.find({ userId })
    if (orders.length === 0) return orders;
    console.log("starting")
    const promises = orders.map(async (order) => {
        const promises = order.products.map(async ({ productId, quantity }) => {
            const { name, imgUrl, price, description } = await Product.findById(productId)
            return {
                productId,
                quantity,
                name,
                imgUrl,
                price,
                description
            }
        })
        return await Promise.all(promises)
    })
    return await Promise.all(promises)
}