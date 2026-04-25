const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { validateSignupData } = require("./utils/validation");
const PORT = process.env.PORT || 7777;
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");
const jwt = require("jsonwebtoken");

// Middleware which converts json data into js object
app.use(express.json());

// Middleware which parses the cookie
app.use(cookieParser());

// To register a new user
app.post("/signup", async(req, res) => {
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

// To login an existing user
app.post("/login", async(req, res) => {

    try{
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if(!user) {
            throw new Error("Invalid credentials");
        } 
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid) {

            // Create a JWT token
            const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
            // console.log(token);

            // Add the token to cookie and send the response back to the user
            res.cookie("token", token);
            res.send("Login successful");

        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

// Get User's profile
app.get("/profile", userAuth, async(req, res) => {

    try{
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

// Connection request API
app.post("/sendConnectionRequest", userAuth, async(req, res) => {
    const user = req.user;
    res.send(user.firstName + " sent the connection request");
})

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