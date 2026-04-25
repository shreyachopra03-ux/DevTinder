require("dotenv").config();
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import cookies from "cookie-parser";
import type { Request, Response, NextFunction } from "express";

const userAuth = async (req: any, res: Response, next: NextFunction) => {
    try {

        const { token } = req.cookies;
        if(!token) {
            throw new Error("Token not found");
        }

        const decodedObj = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };

        const { _id } = decodedObj;
        const user = await User.findById({ _id });
        if(!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch(err: any) {
        (res as any).status(400).send("ERROR : " + err.message);
    }
}

export default userAuth;