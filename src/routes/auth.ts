import express from 'express';
const authRouter = express.Router();
import bcrypt from 'bcrypt';
import { validateSignupData } from '../utils/validation';
import User from '../models/user';

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
        } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/login", async(req, res) => {

    try{
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

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
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = authRouter;