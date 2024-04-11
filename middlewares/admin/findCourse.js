const { Course } = require("../../db/schema");

async function findUser(req, res, next){
    const jsonData = req.body;
    const result = await Course.findOne({ title: jsonData.title, owner: jsonData.owner, price: jsonData.price })

    if(result){
        return res.status(409).json({
            msg: "Course Already Exists"
        });
    }

    return next();
}

module.exports = findUser;