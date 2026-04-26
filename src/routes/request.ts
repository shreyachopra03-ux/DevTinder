import express from 'express';
const requestRouter = express.Router();
import userAuth from '../middlewares/auth';
import type { Request, Response } from "express";

interface IUser {
    firstName: string;
    lastName?: string;
    emailId: string; 
    password: string;
    gender: string
    age: number;
}

interface AuthRequest extends Request {
    user?: IUser;
}

requestRouter.post("/sendConnectionRequest", userAuth, async (req: AuthRequest, res: Response) => {
    const user = req.user;
    res.send(user?.firstName + " sent the connection request");
});

export default requestRouter;
