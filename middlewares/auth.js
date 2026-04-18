const adminAuthorization = (req, res, next) => {
    console.log("auth handled successfullly");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized) {
        res.status(401).send("unauthorized admin");
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("user auth handled successfullly");
    const token = "hahahahhahh";
    const userAuth = token === "xyz";
    if(!userAuth) {
        res.status(401).send("user auth didn't match");
    } else {
        next();
    }
};

module.exports = { adminAuthorization, userAuth };