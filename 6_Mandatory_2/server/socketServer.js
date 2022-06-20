import { Server } from "socket.io";
import { resolveAndMapUserName } from "./routes/functions.js";
import ChatRoom from "./models/chatRoom.js"

const socketServer = (socketPort, mongoose) => {
    const io = new Server(socketPort, {
        cors: {
            origin: ['http://localhost:8080']
        }
    });
    registerChatRoomSocket(io)
    registerChatRoomsSocket(io)
    registerChangeStream(io, mongoose)
}

const registerChatRoomSocket = (io) => {
    io.of("/socket/chatroom").on("connection", (socket) => {
        console.log("socket.io, /chatrooom: User connected: ", socket.id);

        socket.on("newChatroom", async ({ category, userId }) => {
            try {
                // TODO: uncomment this
                await ChatRoom.create({
                    category,
                    userId,
                    socketId: socket.id,
                    roomId: socket.id,
                    messages: [
                    ],
                    hasUnreadMessages: true
                })
            } catch (error) {
                console.log(error)
            }
        })

        socket.on("newMessage", async (message) => {
            console.log(message, socket.id)
            try {
                ChatRoom.findOneAndUpdate(
                    { roomId: socket.id },
                    { $push: { messages: message } },
                    (error, success) => {
                        // console.log(error, "error")
                        // console.log(success, "success")
                    });
            } catch (error) {
                console.log(error)
            }
            io.of("/socket/chatroom").to(socket.id).emit("newMessage", message)
        })

        socket.on("joinRoom", (roomId) => {
            console.log(`${socket.id} user joined ${roomId} room`)
            socket.join(roomId)
        })

        socket.on("disconnect", () => {
            console.log("socket.io, /chatroom: User disconnected: ", socket.id);
        });
    });
}

const registerChatRoomsSocket = (io) => {
    io.of("/socket/chatrooms").on("connection", (socket) => {
        console.log("socket.io, /chatrooms: User connected: ", socket.id);

        socket.on("disconnect", () => {
            console.log("socket.io, /chatroooms: User disconnected: ", socket.id);
        });
    });
}

const registerChangeStream = (io, mongoose) => {
    const db = mongoose.connection;
    const collection = db.collection('chatrooms');
    const changeStream = collection.watch();
    changeStream.on('change', async (next) => {
        // console.log(next) 
        switch (next.operationType) {
            case 'insert': {
                let { fullDocument: chatRoom } = next
                chatRoom = await resolveAndMapUserName(chatRoom)
                io.of("/socket/chatrooms").emit("new-active-chat-room", chatRoom)
                break;
            }
            //TODO: also listen for updates on hasUnreadMessages
            default: {
                break;
            }
        }
    });
}

export default socketServer;