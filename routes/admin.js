const { Router } = require("express");
const express = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminModel } = require("../db");
const { secret , auth} = require("../auth");
const JWT_SECRET = secret;
const adminRouter = Router();

adminRouter.use(express.json());
adminRouter.post("/signup" , async function(req, res) {
    const reqSchema = z.object({
        email: z.string().email(),
        pasword: z.string(),
        firstname: z.string(),
        lastname: z.string()
    })

    const reqAccepted = reqSchema.safeParse(req.body);
    if (reqAccepted.success) {

        const hashPassword = await bcrypt.hash(req.body.password, 2);
      
        try {
            await adminModel.create({
                // here i can push direct also
                email: reqAccepted.data.email,
                password: hashPassword,
                fname: reqAccepted.data.firstname,
                lname: reqAccepted.data.lastname
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

adminRouter.post("/login" ,async function(req, res) {
    const reqSchema = z.object({
        email: z.string().email(),
        pasword: z.string()
    })

    const reqMatched = reqSchema.safeParse(req.body);

    if (reqMatched.success) {
        try {
            const admin = await adminModel.findOne({
                email: reqMatched.data.email,
            })
            if (admin) {
                const passwordMatchedOrNot = await bcrypt.compare(reqMatched.data.password, user.password);
                if (passwordMatchedOrNot) {
                    // now we are generating the token
                    const token = jwt.sign({
                        id: user._id.toString()
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


adminRouter.post("/course",auth,function(req, res) {

})


adminRouter.get("/bulk",auth , function(req, res) {

})

// i can also do the error handling
adminRouter.use(function(err, req, res, next) {
    return res.status(404).json({
        msg : "server has some issue"
    })
})

module.exports = {
    adminRouter : adminRouter
}