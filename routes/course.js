const {Router} = require("express");
const {courseModel , purchaseModel} = require("../db");
const {auth} = require("../middelware/auth")
const courseRouter = Router();

courseRouter.post("/purchase" , auth , async function(req, res) {
    const userId = req.body.userId;
    const courseId = req.body.courseId;
    console.log("user id " + userId)
    console.log("course id " + courseId)
    try {
        const purchaesedOrNot = await purchaseModel.findOne(
            {
                courseId : courseId,
                userId : userId
            }
        )

        if(purchaesedOrNot) {

        await purchaseModel.create({
            courseId : courseId,
            userId : userId
        })

        return res.json({
            msg: "course purchased"
        })
    }
    else{
        return res.json({
            msg : "you already purchased this course"
        })
    }
    }
    catch (err) {
        return res.json({
            msg: "purchase not working"
        })
    }
})

courseRouter.get("/all" ,async function(req, res) {
    try{
        const allCourse = courseModel.find({})
        if(allCourse) {
        return res.json({
            msg : "all courses",
            courses : allCourse
        })
    }
        else{
            return res.json({
                msg : " no courses"
            })
        }
    }
    catch(err) {
        console.log(err);
        return res.json({
            msg : "datasbase error"
        })
    }
})


module.exports = {
    courseRouter : courseRouter
}
