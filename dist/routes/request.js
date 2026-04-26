import express from 'express';
const requestRouter = express.Router();
import userAuth from '../middlewares/auth.js';
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    res.send(user?.firstName + " sent the connection request");
});
export default requestRouter;
