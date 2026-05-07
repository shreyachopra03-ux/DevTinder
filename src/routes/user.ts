import express from "express";
const userRouter = express.Router();
import type { Request, Response } from "express";
import userAuth from "../middlewares/auth.js";
import ConnectionRequest from "../models/connectionRequest.js";
import User from "../models/user.js";
const USER_SAFE_DATA = "firstName lastName age gender skills about photoUrl";

interface IUser {
    firstName: string;
    lastName?: string | null;
    emailId: string; 
    password: string;
    gender: string
    age: number;
    _id: string;
    loggedInUser: string
}

interface AuthRequest extends Request {
    user?: IUser;
}

userRouter.get("/user/requests/received", userAuth, async(req: AuthRequest, res: Response) => {

    try {
        const loggedInUser = req.user;

        if(!loggedInUser) {
        return res.status(401).send("Please Login!");
        }
       
        const connectionRequests = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
        }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "skills", "about", "photoUrl"]);

        res.json({
            message: "Data fetched successfully !!",
            data: connectionRequests 
        });
    } catch (err: any) {
        return res.status(400).json("ERROR : " + err.message)
    }
});

userRouter.get("/user/connections", userAuth, async(req: AuthRequest, res: Response) => {

    try {
        const loggedInUser = req.user;

        if(!loggedInUser) {
            throw new Error("Please login!")
        }

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id , status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" }
            ]
        })
        .populate("fromUserId", ["firstName", "lastName", "age", "gender", "skills", "about", "photoUrl"])
        .populate("toUserId", ["firstName", "lastName", "age", "gender", "skills", "about", "photoUrl"]);

        console.log(connectionRequests);

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });
    } catch (err: any) {
        res.status(400).send("ERROR : " + err.message);
    }
});

userRouter.get("/user/feed", userAuth, async(req: AuthRequest, res: Response) => {

    try{
        const loggedInUser = req.user;

        if(!loggedInUser) {
            throw new Error("User not found");
        }

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ],
        }).select("fromUserId toUserId");

        const hiddenUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hiddenUsersFromFeed.add(req.fromUserId.toString());
            hiddenUsersFromFeed.add(req.toUserId.toString());
        });
    
        const users = await User.find({
        $and: [
        { _id: { $nin: Array.from(hiddenUsersFromFeed) as string[] } },
        { _id: { $ne: loggedInUser._id } },
        ],
        }).select(USER_SAFE_DATA);

    res.send(users);
    } catch (err: any) {
        res.status(400).send("ERROR : " + err.message);
    }
});

export default userRouter;