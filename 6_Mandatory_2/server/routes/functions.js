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
    //TODO: fetch all orders
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
    const orders = await Order.find({ userId })
    if (orders.length === 0) return orders;
    orders.map(async (order) => {
        return await order.products.map(async (product) => {
            console.log("new product")
            const resolvedProduct = await Product.findById(product.productId)
            const newObj = {
                name: resolvedProduct.name
            }
            console.log(newObj)
            return newObj
        })
    })
    console.log("returning")
    return orders
}