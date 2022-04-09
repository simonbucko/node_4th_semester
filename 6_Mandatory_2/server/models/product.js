import mongoose from "mongoose"
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 2
    },
    imgUrl: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0,
    },
    description: {
        type: String,
        minlength: 5
    }
})

export default mongoose.model("Product", productSchema)