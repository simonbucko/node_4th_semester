import express from "express";
import cors from "cors";
import dotenv from "dotenv"
//routes handlers
import userRouter from "./routes/usersRouter.js"

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());

//routers
app.use("/api/users", userRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Starting server on port:", PORT);
});