const { Router } = require("express");
const jwt = require("jsonwebtoken")
const { Admin, Course } = require("../db/schema");
const usernameAuthentication = require("../middlewares/usernameAuth");
const inputAuthentication = require("../middlewares/inputAuth");
const findUser = require("../middlewares/admin/findUser");
const signatureAuthorization = require("../middlewares/signatureAuthorize");
const courseInputAuthentication = require("../middlewares/admin/courseInputAuth")
const findCourse = require("../middlewares/admin/findCourse")
require('dotenv').config();

const route = Router();
const secretKey = process.env.JWT_SECRET_KEY;

route.post("/signup", usernameAuthentication, inputAuthentication, findUser, async (req, res)=>{
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

route.post("/signin", inputAuthentication, async (req, res)=>{
    const jsonData = req.body;

    const response = await Admin.findOne({email: jsonData.email, password: jsonData.password});

    if(!response){
        return res.status(401).json({
            msg: "Either the admin email or the password is incorrect"
        });
    }

    const signature = jwt.sign({email: jsonData.email}, secretKey);
    const token = "Bearer " + signature;

    return res.status(200).json({
        token
    })
})

route.use(signatureAuthorization);

route.post("/courses", courseInputAuthentication, findCourse, async (req, res)=>{
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

route.get("/courses", async (req,res)=>{
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

module.exports = route;