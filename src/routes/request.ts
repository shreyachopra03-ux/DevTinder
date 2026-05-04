import express from 'express';
const requestRouter = express.Router();
import userAuth from '../middlewares/auth.js';
import type { Request, Response } from "express";
import ConnectionRequest from "../models/connectionRequest.js";
import User from "../models/user.js";

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

        // 1st corner case
        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)) {
            return res
            .status(400)
            .json({ message: "Invalid status type : " + status });
        }

        // 2nd corner case
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User not found !!"});
        }

        // 3nd corner case
        const existingConnectionRequest = await ConnectionRequest.findOne({
            // It's a mongodb query which means that if the user A has already send connection req to user B or user B has already sent connection req to user A 
            // so in both the cases, duplicate connection request error will come. 
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ]
        });
        if(existingConnectionRequest) {
            return res.status(400).json({ message: "Connection request already exists !!"})
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({
            message: `${status}`,
            data
        });
    } catch (err: any) {
        res.status(400).send("ERROR : " + err.message)
    }
});

export default requestRouter;
