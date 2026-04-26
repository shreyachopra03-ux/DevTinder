import express from 'express';
const profileRouter = express.Router();
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

profileRouter.get("/profile", userAuth, async(req: AuthRequest, res: Response) => {

    try{
        const user = req.user;
        res.send(user);
    } catch (err: any) {
        res.status(400).send("ERROR : " + err.message);
    }
});

export default profileRouter;