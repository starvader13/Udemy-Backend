const mongoose = require("mongoose");
require('dotenv').config();

const targetCluster = "udemyBackend"
const mongodbConnectionString = process.env.MONGODB_URL_STRING + targetCluster;

mongoose.connect(mongodbConnectionString).then(()=>{
    console.log("Connection Successful");
}).catch(()=>{
    console.log("Connection Failed");
})

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

const adminSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: true
    }
})

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    owner: String,
    imageLink: String,
    price: Number,
    published: Boolean
})

const purchaseSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
})

const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = {
    Admin,
    User,
    Course,
    Purchase
}
