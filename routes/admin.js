const { Router } = require("express");
const express = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminModel, courseModel } = require("../db");
const { secret, auth } = require("../authadmin");
const JWT_SECRET = secret;
const adminRouter = Router();

adminRouter.use(express.json());
adminRouter.post("/signup", async function (req, res) {
    const reqSchema = z.object({
        email: z.string().email(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string()
    })

    const reqAccepted = reqSchema.safeParse(req.body);
    if (reqAccepted.success) {

        const hashPassword = await bcrypt.hash(req.body.password, 2);

        try {
            await adminModel.create({
                // here i can push direct also
                email: reqAccepted.data.email,
                password: hashPassword,
                firstName: reqAccepted.data.firstName,
                lastName: reqAccepted.data.lastName
            });
            return res.json({
                msg: "you are signed up"
            })
        }
        catch (err) {
            return res.json({
                msg: "database has some error"
            })
        }
    }
    else {
        return res.send(reqAccepted.error.format);
    }
}
)


adminRouter.post("/login", async function (req, res) {
    const reqSchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const reqMatched = reqSchema.safeParse(req.body);

    if (reqMatched.success) {
        try {
            const admin = await adminModel.findOne({
                email: reqMatched.data.email,
            })
            if (admin) {
                const passwordMatchedOrNot = await bcrypt.compare(reqMatched.data.password, admin.password);
                if (passwordMatchedOrNot) {
                    // now we are generating the token
                    const token = jwt.sign({
                        adminId: admin._id.toString()
                    }, JWT_SECRET)

                    return res.json({
                        msg: token
                    })
                }
                else {
                    return res.json({
                        msg: "unauthorised access . password not match"
                    })
                }
            }
            else {
                return res.json({
                    msg: "please signup first"
                })
            }
        }
        catch (err) {
            console.log(err);
            return res.json({
                msg: "database error"
            })
        }
    }
    else {
        return res.send(reqMatched.error.format);
    }
}
)


adminRouter.post("/course", auth, async function (req, res) {
    const courseSchema = z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        imageUrl: z.string(),
        adminId: z.string()
    })

    // console.log(req.body.adminId)

    const courseSchemaPassed = courseSchema.safeParse(req.body);
    if (courseSchemaPassed.success) {
        try {
            await courseModel.create({
                title: courseSchemaPassed.data.title,
                description: courseSchemaPassed.data.description,
                price: courseSchemaPassed.data.price,
                imageUrl: courseSchemaPassed.data.imageUrl,
                adminId: courseSchemaPassed.data.adminId
            })
            return res.json({
                msg: "course has been uploaded"
            })
        }
        catch (err) {
            console.log(err);
            return res.json({
                msg: "database has error"
            })
        }
    }
    else{
        return res.json({
            msg : "Invalid format"
        })
    }
    // const adminId = req.adminId;



})

adminRouter.put("/course" , auth , async function(req, res) {

})

adminRouter.get("/bulk", auth, function (req, res) {

})

// i can also do the error handling
adminRouter.use(function (err, req, res, next) {
    return res.status(404).json({
        msg: "server has some issue"
    })
})

module.exports = {
    adminRouter: adminRouter
}