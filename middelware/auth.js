// const express = require("express");

// const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jagdishsuthar";
function auth(req, res, next) {
    const token = req.headers.token;
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.body.userId = decodedToken.userId;
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
