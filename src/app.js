const express = require('express');
const app = express();

const { adminAuthorization, userAuth } = require("../middlewares/auth");

// We can also wrap the routes inside an array, it will make no difference.
// app.use("/route", [rH, rH2, rH3, rH4, rH5]);

// GET /users => middleware => request handler

// Handle Auth middleware for all GET, POST...requests
app.use("/admin", adminAuthorization);

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

app.listen(7777, () => {
    console.log("Server is listening on port 7777...")
});