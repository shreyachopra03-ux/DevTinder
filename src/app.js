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
    


