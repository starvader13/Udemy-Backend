const { User } = require("../../db/schema");

async function findUser(req, res, next){
    const jsonData = req.body;
    const result = await User.findOne({ email: jsonData.email })

    if(result){
        return res.status(409).json({
            msg: "User Already Exists"
        });
    }

    return next();
}

module.exports = findUser;