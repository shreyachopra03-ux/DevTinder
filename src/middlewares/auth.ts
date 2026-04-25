require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cookies = require("cookie-parser")

const userAuth = async (req, res, next) => {
    try {

        const { token } = req.cookies;
        if(!token) {
            throw new Error("Token not found");
        }

        const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET);

        const { _id } = decodedMessage;
        const user = await User.findById({ _id });
        if(!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch(err) {
         res.status(400).send("ERROR : " + err.message);
    }
}

module.exports = { userAuth };