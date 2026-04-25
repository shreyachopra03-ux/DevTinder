import express from 'express';
const profileRouter = express.Router();
import userAuth from '../middlewares/auth';
import type { Request, Response } from "express";

profileRouter.get("/profile", userAuth, async(req: any, res: Response) => {

    try{
        const user = req.user;
        res.send(user);
    } catch (err: any) {
        res.status(400).send("ERROR : " + err.message);
    }
});

export default profileRouter;