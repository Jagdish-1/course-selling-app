const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter} = require("./routes/admin")
const {userModel , adminModel , courseModel , purchaseModel} = require("./db")
mongoose.connect("mongodb+srv://jagdishsuthar4581:j8J8up7a0bI9R4uY@course-selling-app.dyqiw.mongodb.net/")

app.use("/users" , userRouter);
app.use("/course" , courseRouter)
app.use("/admin" , adminRouter);
app.listen(3000);





