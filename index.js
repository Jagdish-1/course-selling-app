const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter} = require("./routes/admin")

app.use("/users" , userRouter);
app.use("/course" , courseRouter)
app.use("/admin" , adminRouter);
app.listen(3000);





