import { Router } from "express";
const router = Router();
// import db from "../database/createConnection.js";

router.get("", async (req, res) => {
    const players = await db.all("SELECT * FROM players;");
    res.send({ data: players });
});

export default router;