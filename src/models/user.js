const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
        trim: true
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email Address:" + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Not A Strong Password:"+ value);
            }
        }
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    gender: {
        type: String,
        required: true,
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        required: true,
        default: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Invalid Photo URL:" + value);
            }
        }
    },
    skills: {
        type: [String],
        validate(value) {
            if(value.length > 10) {
                throw new Error("Skills cannot be more than 10");
            }
        }
    },
    about: {
        type: String,
        default: "This is user's default about",
        maxLength: 500
    }
}, {
    timestamps: true
   }
);

module.exports = mongoose.model("User", userSchema);