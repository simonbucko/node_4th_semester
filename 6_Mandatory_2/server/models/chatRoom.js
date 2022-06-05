import mongoose from "mongoose"
const { Schema } = mongoose;

const chatRoom = new Schema({
    customerId: {
        type: String,
        trim: true,
        required: true
    },
    socketId: {
        type: String,
        trim: true,
        required: true
    },
    roomId: {
        type: String,
        trim: true,
        required: true
    },
    hasUnreadMessages: {
        type: Boolean,
        required: true
    },
    messages: {
        type: [{
            sender: {
                type: String,
                trim: true,
                required: true
            },
            text: {
                type: String,
                trim: true,
                required: true
            },
            timestamp: {
                type: String,
            }
        }],
    }
})

export default mongoose.model("ChatRoom", chatRoom)