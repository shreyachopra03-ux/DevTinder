import express from 'express';
const authRouter = express.Router();
import bcrypt from 'bcrypt';
import { validateSignupData } from '../utils/validation';
import User from '../models/user';
import type { Request, Response } from 'express';

interface IUser {
    validatePassword: (password: string) => Promise<boolean>;
    getJWT: () => Promise<string>;
    firstName: string;
    lastName?: string;
    emailId: string; 
    password: string;
    gender: string
    age: number;
}

authRouter.post("/signup", async(req, res) => {
    // console.log(req.body);
  
    // Always use try catch block while handling DB
    try{
        const { firstName, lastName, emailId, password, gender, age } = req.body;

        // Validate the data
        validateSignupData(req);

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        // Creating a new instance of the User model
        const user = new User({
            firstName, 
            lastName, 
            emailId, 
            password: passwordHash,
            gender,
            age
        });

        await user.save();
        res.send("User added successfully....");
        } catch (err: any) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/login", async(req: Request , res: Response) => {

    try{
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId }) as unknown as IUser;

        if(!user) {
            throw new Error("Invalid credentials");
        } 
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid) {

            // Create a JWT token
            const token = await user.getJWT();
            // console.log(token);

            // Add the token to cookie and send the response back to the user
            res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)});
            res.send("Login successful");

        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err:any) {
        res.status(400).send("ERROR : " + err.message);
    }
});

export default authRouter;