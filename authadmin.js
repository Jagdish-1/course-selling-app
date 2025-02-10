// const express = require("express");

// const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "adminjagdishsuthar";
function auth(req, res, next) {
    const token = req.headers.token;
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.id = decodedToken.id;
        next();
    }
    catch (err) {
        console.log(err);
        return res.json({
            msg: "token invalid"
        })
    }
}


module.exports = {
    secret : JWT_SECRET,
    auth : auth
}
