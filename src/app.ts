const express = require('express');
import connectDB from './config/database';
const app = express();
const PORT = process.env.PORT || 7777;
const cookieParser = require("cookie-parser");

// Middleware which converts json data into js object
app.use(express.json());

// Middleware which parses the cookie
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter  = require('./routes/profile')
const requestRouter = require('./routes/request');

// Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is already in use..., so trying ${port + 1}...`);
            startServer(Number(port) + 1); 
        } else {
            console.error("Server error:", err);
        }
    });
}

connectDB()
    .then(() => {
        console.log("Database connected successfully...");
        startServer(PORT);
    })
    .catch((err) => {
        console.error("Database connection failed!");
        process.exit(1); 
    });