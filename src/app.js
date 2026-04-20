const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.post("/signup", async(req, res) => {
    // Creating a new instance of the User model
    const user = new User({
        firstName: "Shreya",
        lastName: "Chopra",
        emailId: "shreya050@gmail.com",
        password: "joabdhsbshs",
    });
    
    // Always use try catch block while handling DB
    try{
    await user.save();
    res.send("User added successfully....");
    } catch (err) {
        res.status(400).send("error saving the user:" + err.message);
    }
});

connectDB()
    .then(() => {
        console.log("Connection was established successfully...")
        app.listen(7777, () => {
        console.log("Server is listening on port 7777...")
        });
    })
    .catch((err) => {
        console.err("Connection wasn't established successfully...")
    });
    


