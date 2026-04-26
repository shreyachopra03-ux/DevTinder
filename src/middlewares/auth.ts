import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import type { Request, Response, NextFunction } from "express";

interface IUser {
    firstName: string;
    lastName?: string | null;
    emailId: string; 
    password: string;
    gender: string
    age: number;
}

interface AuthRequest extends Request {
    user?: IUser;
}


const userAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
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
        req.user = user as unknown as IUser;
        next();
    } catch(err: any) {
        (res as any).status(400).send("ERROR : " + err.message);
    }
}

export default userAuth;