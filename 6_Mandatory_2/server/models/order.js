import mongoose from "mongoose"
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: {
        type: String,
        trim: true,
        required: true,
    },
    products: {
        type: [{
            productId: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 0,
            }
        }]
    },
    deliveryAddress: {
        type: String,
        trim: true,
        min: 5,
    },
    cardNumber: {
        type: String,
        trim: true,
        minlength: 15
    },
    status: {
        type: String,
        trim: true
    }
})

export default mongoose.model("Order", orderSchema)