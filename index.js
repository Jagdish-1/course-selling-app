const express = require("express");
const app = express();
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin")
const { courseRouter } = require("./routes/course");
const dotenv = require("dotenv");
dotenv.config();


app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter)





function main() {
    mongoose.connect(process.env.connection).then(function () {
        app.listen(process.env.PORT);
        console.log("database connected");
    }
    )
        .catch((err) => {
            console.log("Not connected to the database");
            console.log(err);
        })
}

main();





