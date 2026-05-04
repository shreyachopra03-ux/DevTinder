import express from 'express';
const requestRouter = express.Router();
import userAuth from '../middlewares/auth.js';
import type { Request, Response } from "express";
import ConnectionRequest from "../models/connectionRequest.js";

interface IUser {
    firstName: string;
    lastName?: string;
    emailId: string; 
    password: string;
    gender: string
    age: number;
    _id: string;
    status?: string;
}

interface AuthRequest extends Request {
    user?: IUser;
}

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req: AuthRequest, res: Response) => {

    try {
        const fromUserId = req.user?._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status as string;

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)) {
            return res
            .status(400)
            .json({ message: "Invalid status type : " + status });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({
            message: `${status}`
        });
    } catch (err: any) {
        res.status(400).send("ERROR : " + err.message)
    }
});

export default requestRouter;
