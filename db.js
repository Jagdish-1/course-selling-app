const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.connection);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    email : {type : String , unique : true},
    password : String,
    firstName : String,
    lastName : String
})

const admin = new Schema({
    email : {type : String , unique : true},
    password : String,
    firstName : String,
    lastName : String
})

const course = new Schema({
     title : String,
     description : String,
     price : Number,
     imageUrl : String,
     adminId : ObjectId
})

const purchase = new Schema({
    courseId : ObjectId,
    userId : ObjectId
})

const userModel = mongoose.model("users" , user); 
const adminModel = mongoose.model("admins" , admin); 
const courseModel = mongoose.model("courses" , course); 
const purchaseModel = mongoose.model("purchases" , purchase);


module.exports = {
    userModel : userModel,
    adminModel : adminModel,
    courseModel : courseModel,
    purchaseModel : purchaseModel
}

