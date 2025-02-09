const { Router } = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const { JWT_SECRET , auth } = require("../auth");
const JWT_SECRET = JWT_SECRET;
const userRouter = Router();

userRouter.use(express.json());

userRouter.post("/signup", async function (req, res) {
    const reqSchema = z.object({
        email: z.string().email(),
        pasword: z.string(),
        fname: z.string(),
        lname: z.string()
    })

    const reqAccepted = reqSchema.safeParse(req.body);
    if (reqAccepted.success) {

        const hashPassword = await bcrypt.hash(req.body.password, 2);

        try {
            await userModel.create({
                // here i can push direct also
                email: reqAccepted.data.email,
                password: hashPassword,
                fname: reqAccepted.data.fname,
                lname: reqAccepted.data.lname
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

userRouter.post("/login", async function (req, res) {
    const reqSchema = z.object({
        email: z.string().email(),
        pasword: z.string()
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