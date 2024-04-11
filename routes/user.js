const express = require("express")
const jwt = require("jsonwebtoken");
const usernameAuthentication = require("../middlewares/usernameAuth");
const inputAuthentication = require("../middlewares/inputAuth");
const findUser = require("../middlewares/user/findUser");
const signatureAuthorization = require("../middlewares/signatureAuthorize");
const findCourse = require("../middlewares/user/findCourse")
const { User, Course, Purchase } = require("../db/schema");
require('dotenv').config();

const app = express();
const secretKey = process.env.JWT_SECRET_KEY;

app.use(express.json());

function signatureToJson(signature){
    const token = signature.slice(7, signature.length);
    return jwt.decode(token);
}

app.post("/signup", usernameAuthentication, inputAuthentication, findUser, async (req, res)=>{
    const jsonData = req.body;

    const user = new User(jsonData);
    const response = await user.save();

    if(!response){
        return res.status(400).json({
            msg: "Internal Server Error"
        });
    }

    return res.status(201).json({
        message: "User Created Successfully"
    });
})

app.post("/signin", inputAuthentication, async (req, res)=>{
    const jsonData = req.body;

    const response = await User.findOne({email: jsonData.email, password: jsonData.password});

    if(!response){
        return res.status(401).json({
            msg: "Either the user email or the password is incorrect"
        });
    }

    const signature = jwt.sign({email: jsonData.email}, secretKey);
    const token = "Bearer " + signature;

    return res.status(200).json({
        token
    })
})

app.use(signatureAuthorization);

app.get("/courses", async (req, res)=>{
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

app.post("/courses/:courseId", findCourse, async (req, res)=>{
    const courseId = req.params.courseId;

    const json = signatureToJson(req.headers.authorization);

    const user = await User.findOne({ email: json.email });

    const purchase = new Purchase({
        userId: user._id,
        courseId: courseId
    })

    const response = await purchase.save();

    if(!response){
        return res.status(400).json({
            msg: "Internal Server Error"
        });
    }

    return res.status(201).json({
        message: "Course Purchased Successfully"
    });
})

app.get("/purchasedCourses", async (req, res)=>{
    const json = signatureToJson(req.headers.authorization);

    const user = await User.findOne({ email: json.email });
    const purchased= await Purchase.find({userId: user._id });

    if(!purchased.length){
        return res.status(204).json({
            msg: "User does not have any course purchased"
        });
    }

    const purchasedCourses = [];

    for (const course of purchased){
        const response = await Course.findOne({_id: course.courseId});
        purchasedCourses.push(response);
    }

    return res.status(200).json({
        purchasedCourses
    })

})