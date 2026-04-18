const express = require('express');
const app = express();

// We can also wrap the routes inside an array, it will make no difference.
// app.use("/route", [rH, rH2, rH3, rH4, rH5]);

app.use(
    "/user",
    (req, res, next) => {
        console.log("1st route handler");
        res.send("1st response handled")
        next();
    },
    (req, res, next) => {
        console.log("2nd route handler");
        res.send("2nd response handled");
        next();
    },
    (req, res, next) => {
        console.log("3rd route handler");
        res.send("3rd response handled");
        next();
    },
    (req, res, next) => {
        console.log("4th route handler");
        res.send("4th response handled");
        next();
    },
    (req, res, next) => {
        console.log("5th route handler");
        res.send("5th response handled");
        next();
    },
);

app.listen(7777, () => {
    console.log("Server is listening on port 7777...")
});