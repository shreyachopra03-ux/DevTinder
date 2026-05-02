import express from 'express';
const profileRouter = express.Router();
import userAuth from '../middlewares/auth.js';
import type { Request, Response } from "express";
import { validateEditProfile } from "../utils/validation.js";
import crypto from "node:crypto";
import User from "../models/user.js";
import { Document } from "mongoose";
import { resend } from "../utils/email.js";
import bcrypt from "bcrypt";

interface IUser extends Document {
    firstName: string;
    lastName?: string;
    emailId: string; 
    password: string;
    gender: string;
    age: number;
    passwordResetToken?: string;
    resetExpiryTime?: number;
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

// forgot-password API
// user submits their mail
profileRouter.post("/profile/forgot-password", async(req: AuthRequest, res: Response) => {

    try {
        const { emailId } = req.body;
        const user = await User.findOne({ emailId : emailId }) as IUser;
        if(!user) {
            return res.status(404).json({ message: "If this email exists, a link has been sent!" })
        }

        // For generating a secure random token 
        const rawResetToken = crypto.randomBytes(32).toString("hex");
        console.log(rawResetToken);
        
        // Storing hash of the rawResetToken in the DB, with its expiry time (15 mins)
        user.passwordResetToken = crypto.createHash('sha256').update(rawResetToken).digest("hex");
        user.resetExpiryTime = Date.now() + 15 * 60 * 1000;
        await user.save({ validateBeforeSave: false });

        console.log("Saved, now check DB");

        const checkUser = await User.findById(user._id);
        console.log("DB token:", checkUser?.passwordResetToken);

        // Send email with a link containing the token
        const resetLink = `https://devtinder.fun/reset-password?token=${rawResetToken}`;

        await resend.emails.send ({
            from: 'support@devtinder.fun',
            to: emailId,
            subject: 'Reset your password',
            html: 
            `<p>Click here to reset your password:</p>
            <a href="${resetLink}">Reset Password</a>
            <p>This link expires in 15 minutes.</p>
            <p>If you didn't request this, ignore this email.</p>` 
        });
        res.status(200).json({ message: "Link sent!" });
    } catch (err: any) {
        res.status(400).send("ERROR : " + err.message);
    }
});

// user clicks the link in their mail
profileRouter.get("/profile/reset-password", async(req: AuthRequest, res: Response) => {

    try {
        const rawResetToken = req.query.rawResetToken || req.query.token; ;
        if(!rawResetToken) {
            throw new Error("Token missing!!")
        }

        const hashedToken = crypto.createHash('sha256').update(rawResetToken as string).digest("hex");
        const user = await User.findOne({ passwordResetToken: hashedToken }) as IUser;
        // console.log(user);

        if(!user) {
            // console.log("user not found");
            throw new Error("Invalid or expired link");
        }

        if(Date.now() > (user.resetExpiryTime || 0)) {
            res.send("Link has expired. Please request a new one.")
        }

        res.status(200).json({ message: "Token valid", emailId: user.emailId });
        } catch (err: any) {
        res.status(400).send("ERROR : " + err.message);
    }
}); 

// user submits their new password
profileRouter.post("/profile/reset-password", async(req: AuthRequest, res: Response) => {
    try {
        const { rawResetToken, newPassword } = req.body;

        const hashedToken = crypto.createHash('sha256').update(rawResetToken).digest("hex");

        const resetRecord = await User.findOne({ passwordResetToken: hashedToken }) as IUser;

        if(!resetRecord || Date.now() > (resetRecord.resetExpiryTime || 0)) {
            throw new Error("Invalid or expired link.")
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        resetRecord.password = hashedPassword;

        resetRecord.passwordResetToken = undefined;
        resetRecord.resetExpiryTime = undefined;
        await resetRecord.save();

        res.status(200).json({ message: "Password updated! Please log in." });
    } catch (err: any) {
        res.status(400).send("ERROR : " + err.message);
    }
});

export default profileRouter;


