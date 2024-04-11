const express = require("express");
const jwt = require("jsonwebtoken")
const { Admin, Course } = require("../db/schema");
const usernameAuthentication = require("../middlewares/usernameAuth");
const adminInputAuthentication = require("../middlewares/adminInputAuth");
const findUser = require("../middlewares/findUser");
const signatureAuthorization = require("../middlewares/signatureAuthorize");
const courseInputAuthentication = require("../middlewares/courseInputAuth")
const findCourse = require("../middlewares/findCourse")
require('dotenv').config();

const app = express();
const secretKey = process.env.JWT_SECRET_KEY;

app.use(express.json());

app.post("/signup", usernameAuthentication, adminInputAuthentication, findUser, async (req, res)=>{
    const jsonData = req.body;

    const admin = new Admin(jsonData);
    const response = await admin.save();

    if(!response){
        return res.status(400).json({
            msg: "Internal Server Error"
        });
    }

    return res.status(201).json({
        message: "Admin Created Successfully"
    });
})

app.post("/signin", adminInputAuthentication, async (req, res)=>{
    const jsonData = req.body;

    const response = await Admin.findOne({email: jsonData.email, password: jsonData.password});

    if(!response){
        return res.status(401).json({
            msg: "Either the email or the password is incorrect"
        });
    }

    const signature = jwt.sign({email: jsonData.email}, secretKey);
    const token = "Bearer " + signature;

    return res.status(200).json({
        token
    })
})

app.post("/courses", signatureAuthorization, courseInputAuthentication, findCourse, async (req, res)=>{
    const jsonData = req.body;
    jsonData.isPublished = true;

    const course = new Course(jsonData);
    const response = await course.save();

    if(!response){
        return res.status(400).json({
            msg: "Internal Server Error"
        });
    }

    return res.status(200).json({
        msg: "Course Created Successfully",
        courseId: response.id
    });
})

app.get("/courses", signatureAuthorization,async (req,res)=>{
    const response = await Course.find();
    if(!response){
        return res.status(204).json({
            msg: "No content in DB."
        })
    }

    return res.status(200).json({
        courses: response
    })
})

app.listen(3000,()=>{
    console.log("Server is listening at port 3000");
});