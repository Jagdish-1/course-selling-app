const {Router} = require("express");
const {adminModel} = require("./db");
const adminRouter = Router();


adminRouter.post("/signup" , function(req, res) {

})

adminRouter.post("/login" , function(req, res) {

})


adminRouter.post("/course", function(req, res) {

})

adminRouter.get("/courses", function(req, res) {

})

module.exports = {
    adminRouter : adminRouter
}