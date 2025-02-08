const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routes/user");
const { adminRouter} = require("./routes/admin")
const { courseRouter } = require("./routes/course");
const dotenv = require("dotenv");
dotenv.config();


app.use("/users" , userRouter);
app.use("/course" , courseRouter)
app.use("/admin" , adminRouter);



app.listen(process.env.PORT);





