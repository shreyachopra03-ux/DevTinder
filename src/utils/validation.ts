import validator from "validator";
import type { Request } from "express";

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

export const validateSignupData = (req: AuthRequest) => {
    const { firstName, lastName, emailId, password } = req.body;
    if(!firstName || !lastName) {
        throw new Error("Enter The Name!");
    } else if(!validator.isEmail(emailId)) {
        throw new Error("Invalid Email");
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Please Enter Strong Password");
    } 
};
