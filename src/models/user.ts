import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        validate: (value: string) => {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email Address:" + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate: (value: string) => {
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
        validate: (value: string) => {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        required: true,
        default: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
        validate: (value: string) => {
            if(!validator.isURL(value)) {
                throw new Error("Invalid Photo URL:" + value);
            }
        }
    },
    skills: {
        type: [String],
        validate: (value: string) => {
            if(value.length > 10) {
                throw new Error("Skills cannot be more than 10");
            }
        }
    },
    about: {
        type: String,
        default: "This is user's default about",
        maxLength: 500
    },
    passwordResetToken: {
        type: String,
        default: null
    },
    resetExpiryTime: {
        type: String,
        default: null
    }
}, {
    timestamps: true
   }
);

userSchema.methods.getJWT = async function () {
    // 'this' keyword refers to the Document (the specific user data) that you just fetched from the database.
    const user = this;
    
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser: string) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
export default User;