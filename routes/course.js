const {Router} = require("express");
const {courseModel , purchaseModel} = require("../db");
const courseRouter = Router();

courseRouter.get("/purchasedcourses" , function(req, res) {

})

courseRouter.get("/all" , function(req, res) {

})


module.exports = {
    courseRouter : courseRouter
}
