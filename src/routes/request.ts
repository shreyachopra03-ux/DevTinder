import express from 'express';
const requestRouter = express.Router();
import userAuth from '../middlewares/auth';
import type { Request, Response } from "express";

requestRouter.post("/sendConnectionRequest", userAuth, async (req: any, res: Response) => {
    const user = req.user;
    res.send(user.firstName + " sent the connection request");
});

export default requestRouter;
