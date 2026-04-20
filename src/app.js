const express = require('express');
const app = express();
require('./config/database');

const { adminAuthorization, userAuth } = require("../middlewares/auth");

// We can also wrap the routes inside an array, it will make no difference.
// app.use("/route", [rH, rH2, rH3, rH4, rH5]);

// GET /users => middleware => request handler

// Handle Auth middleware for all GET, POST...requests
app.use("/admin", adminAuthorization);

app.use("/user/login", (req, res) => {
    res.send("User logged in successfully...");
});

app.use("/user" , userAuth, (req, res, next) => {
    res.send("user data sent");
    next();
});

app.get("/admin/getAllData", (req, res, next) => {
        res.send("All data sent");
        next();
});

app.get("/admin/deleteUser", (req, res) => {
        res.send("delete the user");
});

app.use("/", (err, req, res, next) => {
    if(err) {
        // log your error
        res.status(500).send("Something went wrong");
    }
});

app.get("/getUserData", (req, res) => {
    try{
        // logic of DB call and get user data
        throw new Error("dhddhhdhdhdh");
        res.send("User Data Sent");
    }
    catch (err) {
        res.status(500).send("Some error ,contact support team");
    }
});

app.use("/", (err, req, res, next) => {
    if(err) {
        // log your error
        res.status(500).send("Something went wrong");
    }
});

app.listen(7777, () => {
    console.log("Server is listening on port 7777...")
});