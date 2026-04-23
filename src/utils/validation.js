const validator = require("validator");

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if(!firstName || !lastName) {
        throw new Error("Enter The Name!");
    } else if(!validator.isEmail(emailId)) {
        throw new Error("Invalid Email");
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Please Enter Strong Password");
    }
}

module.exports = { validateSignupData };