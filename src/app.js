const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

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
        await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "before" });
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

connectDB()
    .then(() => {
        console.log("Database connected...");
        const server = app.listen(7777, () => {
            console.log("Server is listening on port 7777...");
        });
        server.on('error', (err) => {
            // EADDRINUSE -> Error: Address Already In Use
            if (err.code === 'EADDRINUSE') {
                console.error("Error: Port 7777 is already in use!");
            } 
            // If the error isn't regarding busy port, it could be regarding EACCES, Invalid Host, System limits
            else {
                console.error("Server error:", err);
            }
        });
    })
    .catch((err) => {
        console.error("DB Connection failed:", err);
    });
    


