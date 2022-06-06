import { Server } from "socket.io";
import { resolveAndMapUserName } from "./routes/functions.js";


const socketServer = (socketPort, mongoose) => {
    const io = new Server(socketPort, {
        cors: {
            origin: ['http://localhost:8080']
        }
    });
    registerChatRoomsSocket(io)
    registerChangeStream(io, mongoose)

}

const registerChatRoomsSocket = (io) => {
    io.of("/socket/chatrooms").on("connection", (socket) => {
        console.log("socket.io: User connected: ", socket.id);

        socket.on("disconnect", () => {
            console.log("socket.io: User disconnected: ", socket.id);
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
            default: {

                break;
            }
        }
    });
}

export default socketServer;