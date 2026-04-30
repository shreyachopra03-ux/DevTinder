import express from 'express';
const profileRouter = express.Router();
import userAuth from '../middlewares/auth.js';
import type { Request, Response } from "express";
import { validateEditProfile } from "../utils/validation.js";
import crypto from "node:crypto";

interface IUser {
    firstName: string;
    lastName?: string;
    emailId: string; 
    password: string;
    gender: string
    age: number;
    passwordResetToken?: string;
    resetExpireTime?: number;
}

interface AuthRequest extends Request {
    user?: IUser;
}

profileRouter.get("/profile/view", userAuth, async(req: AuthRequest, res: Response) => {

    try{
        const user = req.user;
        res.send(user);
    } catch (err: any) {
        res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.post("/profile/edit", userAuth, async (req: AuthRequest, res: Response) => {

    try {
    validateEditProfile(req);

    const loggedInUser = req.user;
    // console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => {
        (loggedInUser as any)[key] = req.body[key];
    });

    await(loggedInUser as any).save();

    res.json({
        message: `${loggedInUser?.firstName}, your profile was updated successfully`,
        data: loggedInUser
    });
    } catch (err: any) {
        res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/password", async(req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        if(!user) {
            throw new Error("User not found");
        }

        // For generating a secure random token 
        const resetToken = crypto.randomBytes(20).toString("hex");
        console.log(resetToken);

        user.passwordResetToken = resetToken;
        user.resetExpireTime = Date.now() + 15 * 60 * 1000;

        await user.save();

        // Send reset password mail to the user
        res.send("https://yourfrontend.com/reset-password?token=token");



    } catch (err: any) {
        res.status(400).send("ERROR : " + err.message);
    }
});

export default profileRouter;


