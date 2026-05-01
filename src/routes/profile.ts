import express from 'express';
const profileRouter = express.Router();
import userAuth from '../middlewares/auth.js';
import type { Request, Response } from "express";
import { validateEditProfile } from "../utils/validation.js";
import crypto from "node:crypto";
import User from "../models/user.js";
import { Document } from "mongoose";

interface IUser extends Document {
    firstName: string;
    lastName?: string;
    emailId: string; 
    password: string;
    gender: string;
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

profileRouter.patch("/profile/forgot-password", async(req: AuthRequest, res: Response) => {
    try {
        const { emailId } = req.body;

        const user = await User.findOne({ emailId : emailId }) as IUser;
        if(!user) {
            res.send(404).send("No user found with this email !")
        }

        // For generating a secure random token 
        const rawResetToken = crypto.randomBytes(32).toString("hex");
        // console.log(resetToken);

        user.passwordResetToken = crypto.createHash('sha256').update(rawResetToken).digest("hex");
        user.resetExpireTime = Date.now() + 15 * 60 * 1000;
        await user.save();

        // Send reset password mail to the user
        const resetUrl = `https://devtinder.fun/reset-password?token=${rawResetToken}`;

    } catch (err: any) {
        res.status(400).send("ERROR : " + err.message);
    }
});

export default profileRouter;


