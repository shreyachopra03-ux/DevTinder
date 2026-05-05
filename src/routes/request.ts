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
    loggedInUser?: string
}

interface AuthRequest extends Request {
    user?: IUser;
}

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req: AuthRequest, res: Response) => {

    try {
        const fromUserId = req.user?._id;
        const { toUserId, status } = req.params;

        // 1st corner case -> Only status ignored/interested can be sent as params in the url.
        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status as string)) {
            return res
            .status(400)
            .json({ message: "Invalid status type : " + status });
        }

        // 2nd corner case -> If the user isn't available on the devTinder platform then randomly connection req to any other user of any other platform can not be sent !
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

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req: AuthRequest, res:Response) => {

    try {
    const loggedInUser = req.user;
    console.log(loggedInUser);
    const { status, requestId } = req.params;
    console.log(requestId);

    // 1st corner case
    const allowedStatus = ["rejected", "accepted"];
    if(!allowedStatus.includes(status as string)) {
        return res.status(400).json({ message: "Invalid status type !!"})
    }

    if(!loggedInUser) {
      return res.status(401).send("Please Login!");
    }

    const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested"
    });
    console.log()

    if(!connectionRequest) {
        return res.status(404).json({ message: "Connection request not found !"})
    }

    // Explicitly telling TS that status can only be of 2 types
    connectionRequest.status = status as "rejected" | "accepted";

    const data = await connectionRequest.save();
    
    return res.json({ 
        message: "Connection request " + status,
        data
    });

    } catch (err: any) {
        return res.status(400).send("ERROR : " + err.message)
    }
});

export default requestRouter;
