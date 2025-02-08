const {Router} = require("express");

const userRouter = Router();

userRouter.post("/signup" , function(req, res) {

})

userRouter.post("/login" , function(req, res) {

})


userRouter.post("/purchase", function(req, res) {

})

module.exports = {
    userRouter : userRouter
}