const { Router } = require("express");
const express = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const { secret , auth } = require("../auth");
const JWT_SECRET = secret;
const userRouter = Router();

// userRouter.use(express.json());

userRouter.post("/signup", async function (req, res) {
    const reqSchema = z.object({
        email: z.string().email(),
        password: z.string(),
        firstname: z.string(),
        lastname: z.string()
    })

    const reqAccepted = reqSchema.safeParse(req.body);
    if (reqAccepted.success) {
        console.log(reqAccepted.data)

        const hashPassword = await bcrypt.hash(req.body.password, 2);

        try {
            await userModel.create({
                // here i can push direct also
                email: reqAccepted.data.email,
                password: hashPassword,
                firstname: reqAccepted.data.firstname,
                lastname: reqAccepted.data.lastname
            });
            return res.json({
                msg: "you are signed up"
            })
        }
        catch (err) {
            console.log(err)
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

userRouter.post("/login", async function (req, res) {
    const reqSchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const reqMatched = reqSchema.safeParse(req.body);

    if (reqMatched.success) {
        try {
            const user = await userModel.findOne({
                email: reqMatched.data.email,
            })
            if (user) {
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


// these are authenticated endpoints so first middleware verify
userRouter.post("/purchase",auth, function (req, res) {

})

module.exports = {
    userRouter: userRouter
}