require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

const PORT = process.env.PORT || 7777;

// Middleware which converts json data into js object
app.use(express.json());

app.post("/signup", async(req, res) => {
    console.log(req.body);
    // Creating a new instance of the User model
    const user = new User(req.body);

    // Always use try catch block while handling DB
    try{
    await user.save();
    res.send("User added successfully....");
    } catch (err) {
        res.status(400).send("error saving the user:" + err.message);
    }
});

// Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
    const users = await User.find({ emailId: userEmail });
        if(users.length === 0) {
            res.status(404).send("User not found");
        } else{
            res.send(users);
        }
     } 
        catch(err) {
        res.status(400).send("something went wrong");
    }
});

// Feed API - GET /feed - get all the users from the DB
app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

// Delete a user from the database
app.delete("/user", async(req, res) => {
    const userId = req.body.userId;
    try{
        // Both ways are correct 
        // const user = await User.findByIdAndDelete({ _id: userId});
        const user = await User.findByIdAndDelete({ userId });
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

// Update user from the database
app.patch("/user", async(req, res) => {
    const data = req.body;
    const userId = req.body.userId;
    try {
        // While updating a user and adding custom made validations, use 'runValidators' flag
        await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "before" , runValidators: true });
        res.send("User updated successfully");
    } catch(err) {
        res.status(400).send("Something went wrong");
    }
});

// Update user's email id
app.patch("/user", async(req, res) => {
    const userEmail = req.body.emailId;
    const data = req.body;
    try {
        await User.findOneAndUpdate({ emailId: userEmail},  data);
        res.send("Email updated successfully");
    } catch(err) {
        res.status(400).send("Something went wrong");
    }
});

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